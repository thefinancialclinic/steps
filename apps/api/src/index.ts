import { resolve } from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Request, Response } from 'express';
import { Routes } from './routes';
import { Pool } from 'pg';
import express = require('express');
import YAML = require('yamljs');
import * as url from 'url';
import { OrgRepository } from './repository/OrgRepository';
import { UserRepository } from './repository/UserRepository';
import * as jwt from 'express-jwt';
import * as jwtAuthz from 'express-jwt-authz';
import { expressJwtSecret } from 'jwks-rsa';
import * as token from 'jsonwebtoken';
import { postgraphile } from 'postgraphile';
import { userPermissionMiddleware } from './permission';

////////////////////////////////////////////////////////////////////////////////
// Configuration
import 'dotenv/config';
import { AuthController } from './controller/AuthController';

const isProduction = process.env.NODE_ENV === 'production';
const isCI = process.env.CI && JSON.parse(process.env.CI) === true;
const PORT = process.env.PORT || '3001';
const localConnString = 'postgres://postgres@localhost:5432/steps_admin_test';
const databaseUrl = process.env.DATABASE_URL || localConnString;
const connUrl = url.parse(databaseUrl);
const buildPath = resolve(__dirname, '..', '..', 'admin', '.build');
const ENABLE_POSTGRAPHILE = process.env.ENABLE_POSTGRAPHILE === 'true';
const AUTH0_ENABLED = process.env.AUTH0_ENABLED === 'true';

// Auth0 Config
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
const AUTH0_ISSUER = process.env.AUTH0_ISSUER;

export const pool = new Pool({
  user: connUrl.auth.split(':')[0],
  password: connUrl.auth.split(':')[1],
  host: connUrl.hostname,
  database: connUrl.pathname.slice(1), // drop leading slash
  port: parseInt(connUrl.port),
});

// Authentication middleware. Please see:
// https://auth0.com/docs/quickstart/backend/nodejs
// for implementation details
const checkJwt = jwt({
  // Retrieve the signing key from the server
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${AUTH0_ISSUER}.well-known/jwks.json`,
  }),

  // Validate the audience of the issuer
  audience: AUTH0_AUDIENCE || 'http://steps-admin.herokuapp.com',
  issuer: AUTH0_ISSUER,
  algorithms: ['RS256'],
  complete: true,
  requestProperty: 'token',
});

// Redirect HTTP requests to HTTPS
const httpsRedirect = (req, res, next) => {
  const { headers, hostname, originalUrl } = req;
  if (headers['x-forwarded-proto'] != 'https') {
    res.redirect(302, `https://${hostname}${originalUrl}`);
  } else {
    next();
  }
};

// TEMPORARY: Seed Org (id: 1) and Coach (id: 1) needed for Client creation
new OrgRepository(pool).seed();
const userRepo = new UserRepository(pool);
userRepo.seed();

////////////////////////////////////////////////////////////////////////////////
// App / Middlewares

const app = express();

app.use(bodyParser.json());

if (isProduction && !isCI) app.use(httpsRedirect);

if (isProduction) {
  app.use(express.static(buildPath));
} else {
  app.use(cors());

  // when not running in production, expose an API documentation route
  // makeSwagger(Routes)
  const swaggerUi = require('swagger-ui-express');
  const swaggerDocument = YAML.load('./swagger.yaml');

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

const bearerTokenAuthMiddleware = (req, res, next) => {
  let _provider, id;
  if (req.token.gty) {
    // M2M token
    id = req.token.azp;
  } else {
    [_provider, id] = req.token.sub.split('|');
  }

  if (!id) {
    res.status(403);
    return res.send({ error: 'Forbidden' });
  }
  userRepo
    .get({ auth0_id: id })
    .then(users => {
      const user = users[0];
      // Case sensitive
      req.headers['x-userid'] = user.id;
      return next();
    })
    .catch(err => {
      res.status(404);
      return res.send({ error: 'Unknown user, cannot auth' });
    });
};

const userIdAuthMiddleware = (req, res, next) => {
  const userId = req.get('X-UserId');
  if (!userId) {
    res.status(403);
    return res.send({
      error: 'Forbidden',
    });
  }
  const userIdInt = parseInt(userId);
  if (!userIdInt) {
    res.status(400);
    return res.send({ error: 'Malformed auth header' });
  }

  userRepo
    .get({ id: userIdInt })
    .then(users => {
      req.user = users[0];
      next();
    })
    .catch(err => {
      res.status(404);
      return res.send({ error: 'Unknown user, cannot auth' });
    });
};

const middlewareForEnivronment = controller => {
  if (AUTH0_ENABLED) {
    return [
      checkJwt, // JWT -> adds req.token
      bearerTokenAuthMiddleware, // token -> req.'x-userid'
      userIdAuthMiddleware, // req.'x-userid' -> req.user
      userPermissionMiddleware(controller), // req.user -> ()
    ];
  } else {
    return [
      userIdAuthMiddleware, // req.'x-userid' -> req.user
      userPermissionMiddleware(controller), // req.user -> ()
    ];
  }
};

////////////////////////////////////////////////////////////////////////////////
// Routes

Routes.forEach(route => {
  (app as any)[route.method](
    route.route,
    ...middlewareForEnivronment(route.controller),
    async (req: Request, res: Response, next: Function) => {
      const controller = new route.controller() as any;
      try {
        const result = await controller[route.action](req, res, next);
        return res.send(result);
      } catch (error) {
        if (isProduction) {
          res.status(500);
          return res.send({ error: 'A server error has occurred.' });
        } else {
          res.status(500);
          return res.send({ error: error });
        }
      }
    },
  );
});

app.post('/api/signup', async (req, res, next) => {
  const controller = new AuthController();
  const result = await controller['signup'](req, res, next);
  res.send(result);
});

app.get('/api/user', checkJwt, async (req, res, next) => {
  const controller = new AuthController();
  const result = await controller['user'](req, res, next);
  res.send(result);
});

// Postgraphile
if (ENABLE_POSTGRAPHILE) {
  app.use(postgraphile(databaseUrl, 'public', { graphiql: true }));
}

// Send any unmatched routes to the React app for frontend routing
if (isProduction) {
  app.all('/api/*', (_, res) => res.status(404).send({ message: 'Not found' }));
  app.all('*', (_, res) => res.sendfile(resolve(buildPath, 'index.html')));
}

////////////////////////////////////////////////////////////////////////////////
// Run server

app.listen(PORT);
console.log(`Express server has started on port ${PORT}.`);
process.env.NODE_ENV !== 'production'
  ? console.log('docs at: /api-docs')
  : false;
