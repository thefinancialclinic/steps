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

////////////////////////////////////////////////////////////////////////////////
// Configuration
import 'dotenv/config';

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || '3001';
const localConnString = 'postgres://postgres@localhost:5432/steps_admin_test';
const connUrl = url.parse(process.env.DATABASE_URL || localConnString);

// Auth0 Config
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
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
  audience: AUTH0_CLIENT_ID,
  issuer: AUTH0_ISSUER,
  algorithms: ['RS256'],
  complete: true,
});

// TEMPORARY: Seed Org (id: 1) and Coach (id: 1) needed for Client creation
new OrgRepository(pool).seed();
new UserRepository(pool).seed();

////////////////////////////////////////////////////////////////////////////////
// App / Middlewares

const app = express();

app.use(bodyParser.json());

if (isProduction) {
  app.use(express.static(resolve(__dirname, '..', '..', 'admin', '.build')));
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

// Route for checking that Auth0 is working
app.get('/api/private', checkJwt, (req, res) => {
  res.type('json');
  return res.send(req.user); // added by checkJwt, contains user data
});

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
