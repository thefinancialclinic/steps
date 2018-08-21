require('dotenv').config({ path: '../../.env' });

import { join, resolve } from 'path';
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
import { expressJwtSecret } from 'jwks-rsa';
import { postgraphile } from 'postgraphile';
import { userPermissionMiddleware } from './permission';
import * as favicon from 'serve-favicon';
import * as Raven from 'raven';
import { getUserFromAuthToken } from './services/Auth';
import logger from './winston';

////////////////////////////////////////////////////////////////////////////////
// Configuration
import { AuthController } from './controller/AuthController';
import { OrgController } from './controller/OrgController';
import { GraphQLController } from './controller/GraphQLController';

const {
  NODE_ENV,
  CI,
  PORT,
  DATABASE_URL,
  POSTGRAPHILE_ENABLED,
  AUTH0_ENABLED,
  SENTRY_DSN,
  SENTRY_DEBUG_DSN,
} = process.env;

const isProduction = NODE_ENV === 'production';
const isCI = CI && JSON.parse(CI) === true;
const port = PORT || '3001';
const localConnString = 'postgres://postgres@localhost:5432/steps_admin_test';

const databaseUrl = DATABASE_URL || localConnString;
const connUrl = url.parse(databaseUrl);
const buildPath = resolve(__dirname, '..', '..', 'admin', '.build');
const publicPath = resolve(__dirname, '..', 'public');

const enablePostgraphile = POSTGRAPHILE_ENABLED === 'true';
const enableAuth0 = AUTH0_ENABLED === 'true';
const sentryDSN = SENTRY_DSN;

// Sentry
if (isProduction) {
  Raven.config(sentryDSN).install();
}

// Auth0 Config
const { AUTH0_AUDIENCE, AUTH0_DOMAIN } = process.env;
const AUTH0_ISSUER = `https://${AUTH0_DOMAIN}/`;

export const pool = new Pool({
  user: connUrl.auth.split(':')[0],
  password: connUrl.auth.split(':')[1],
  host: connUrl.hostname,
  database: connUrl.pathname.slice(1), // drop leading slash
  port: parseInt(connUrl.port),
  max: 120,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

logger.info('Logger started');

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

const bearerTokenAuthMiddleware = async (req, res, next) => {
  try {
    const user = await getUserFromAuthToken(req, userRepo);
    if (!user) {
      res.status(401);
      return res.send({ error: 'Unknown user, cannot auth' });
    }
    req.headers['x-userid'] = user.id;
    return next();
  } catch (err) {
    res.status(401);
    return res.send({ error: 'Unknown user, cannot auth' });
  }
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
      logger.error(err);
      res.status(404);
      return res.send({ error: 'Unknown user, cannot auth' });
    });
};

const middlewareForEnvironment = controller => {
  if (enableAuth0) {
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

const sendStandardError = (res, error: Error) => {
  logger.error(error);
  return res.status(500).send({ error: 'A server error has occured' });
};

Routes.forEach(route => {
  (app as any)[route.method](
    route.route,
    ...middlewareForEnvironment(route.controller),
    async (req: Request, res: Response, next: Function) => {
      const controller = new route.controller() as any;
      try {
        const result = await controller[route.action](req, res, next);
        return res.send(result);
      } catch (error) {
        if (isProduction) {
          return sendStandardError(res, error);
        } else {
          res.status(500);
          logger.error(error);
          return res.send({ error: error });
        }
      }
    },
  );
});

app.get('/api/user', checkJwt, async (req, res, next) => {
  try {
    const controller = new AuthController();
    const result = await controller['user'](req, res, next);
    res.send(result);
  } catch (error) {
    return sendStandardError(res, error);
  }
});

app.post('/api/signup', async (req, res, next) => {
  try {
    const controller = new AuthController();
    const result = await controller['signup'](req, res, next);
    res.send(result);
  } catch (error) {
    return sendStandardError(res, error);
  }
});

app.get('/api/orgs/:id', async (req, res, next) => {
  try {
    const controller = new OrgController();
    const result = await controller['one'](req, res, next);
    res.send(result);
  } catch (error) {
    return sendStandardError(res, error);
  }
});

// Postgraphile
if (enablePostgraphile) {
  app.use(
    '/api/postgraphile',
    cors({
      origin: /helloroo\.org$/,
    }),
    ...middlewareForEnvironment(GraphQLController),
    postgraphile(databaseUrl, 'public'),
  );
}

// Favicon
app.use(favicon(join(publicPath, 'favicon.ico')));

// Send any unmatched routes to the React app for frontend routing
if (isProduction) {
  app.all('/api/*', (_, res) => res.status(404).send({ message: 'Not found' }));
  app.all('*', (_, res) => res.sendFile(resolve(buildPath, 'index.html')));
}

////////////////////////////////////////////////////////////////////////////////
// Run server

app.listen(port);
console.log(`Express server has started on port ${port}.`);
process.env.NODE_ENV !== 'production'
  ? console.log('docs at: /api-docs')
  : false;
