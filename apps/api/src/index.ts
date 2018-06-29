import { resolve } from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Request, Response } from 'express';
import { Routes } from './routes';
import { Pool } from 'pg';
import express = require('express');
import { writeFileSync, writeFile, readFileSync, existsSync } from 'fs';
import YAML = require('yamljs');
import * as url from 'url';
import { OrgRepository } from './repository/OrgRepository';
import { UserRepository } from './repository/UserRepository';
import * as jwt from 'express-jwt';
import * as jwtAuthz from 'express-jwt-authz';
import { expressJwtSecret } from 'jwks-rsa';
import * as token from 'jsonwebtoken';
import { postgraphile } from 'postgraphile';

////////////////////////////////////////////////////////////////////////////////
// Configuration
require('dotenv').config({ path: '../../.env' });
import { AuthController } from './controller/AuthController';

const isProduction = process.env.NODE_ENV === 'production';
const isCI = process.env.CI && JSON.parse(process.env.CI) === true;
const PORT = process.env.PORT || '3001';
const localConnString = 'postgres://postgres@localhost:5432/steps_admin_test';
const databaseUrl = process.env.DATABASE_URL || localConnString;
const connUrl = url.parse(databaseUrl);
const buildPath = resolve(__dirname, '..', '..', 'admin', '.build');
const ENABLE_POSTGRAPHILE = process.env.ENABLE_POSTGRAPHILE === 'true';

// Auth0 Config
const { AUTH0_AUDIENCE, AUTH0_PROTOCOL, AUTH0_DOMAIN } = process.env;
const AUTH0_ISSUER = `https://${AUTH0_DOMAIN}/`;

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

////////////////////////////////////////////////////////////////////////////////
// Routes

Routes.forEach(route => {
  (app as any)[route.method](
    route.route,
    async (req: Request, res: Response, next: Function) => {
      const controller = new route.controller() as any;
      try {
        const result = await controller[route.action](req, res, next);
        res.send(result);
      } catch (error) {
        if (isProduction) {
          res.status(500);
          res.send({ error: 'A server error has occurred.' });
        } else {
          res.status(500);
          res.send({ error: error });
        }
      }
    },
  );
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
  app.all('*', (_, res) => res.sendfile(resolve(buildPath, 'index.html')));
}

// Error handling
if (process.env.NODE_ENV !== 'production') {
  app.use((err, req, res, next) => {
    if (err) {
      console.log(err);
      res.status(err.status);
      res.send(err);
    } else {
      res.status(500);
      res.send({ error: err });
    }
  });
} else {
  app.use((err, req, res, next) => {
    res.status(500);
    res.send({ error: 'Server error' });
  });
}

////////////////////////////////////////////////////////////////////////////////
// Run server

app.listen(PORT);
console.log(`Express server has started on port ${PORT}.`);
process.env.NODE_ENV !== 'production'
  ? console.log('docs at: /api-docs')
  : false;
