require('dotenv').config({ path: '../../.env' });

import { join, resolve } from 'path';
import { postgraphile } from 'postgraphile';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as favicon from 'serve-favicon';
import * as Raven from 'raven';
import { getUserFromAuthToken } from './services/Auth';
import logger from './winston';
import express = require('express');
import YAML = require('yamljs');

import { databaseUrl } from './db';
import * as middleware from './middleware';
import apiRoutes from './routes';

////////////////////////////////////////////////////////////////////////////////
// Configuration
import { AuthController } from './controller/AuthController';
import { OrgController } from './controller/OrgController';

const {
  NODE_ENV,
  CI,
  PORT,
  DATABASE_URL,
  ENABLE_POSTGRAPHILE,
  AUTH0_ENABLED,
  SENTRY_DSN,
  SENTRY_DEBUG_DSN,
} = process.env;

const isProduction = NODE_ENV === 'production';
const isCI = CI && JSON.parse(CI) === true;
const port = PORT || '3001';
const buildPath = resolve(__dirname, '..', '..', 'admin', '.build');
const publicPath = resolve(__dirname, '..', 'public');

const enablePostgraphile = ENABLE_POSTGRAPHILE === 'true';
const sentryDSN = SENTRY_DSN;

// Sentry
if (isProduction) {
  Raven.config(sentryDSN).install();
}

logger.info('Logger started');

////////////////////////////////////////////////////////////////////////////////
// App / Middlewares

const app = express();

app.use(bodyParser.json());

if (isProduction && !isCI) app.use(middleware.httpsRedirect);

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

const sendStandardError = (res, error: Error) => {
  logger.error(error);
  return res.status(500).send({ error: 'A server error has occured' });
};

// Mount the API routes under '/api'
app.use('/api', apiRoutes);

app.get('/api/user', middleware.checkJwt, async (req, res, next) => {
  const controller = new AuthController();
  const result = await controller['user'](req, res, next);
  res.send(result);
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

app.get('/api/orgs/:id', OrgController.one);

// Postgraphile
if (enablePostgraphile) {
  app.use(postgraphile(databaseUrl, 'public', { graphiql: true }));
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
