import { resolve } from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Request, Response } from 'express';
import { Routes } from './routes';
import { Pool } from 'pg';
import express = require('express');
import { writeFileSync, writeFile } from 'fs';
import YAML = require('yamljs');
import * as url from 'url';
import { OrgRepository } from './repository/OrgRepository';
import { UserRepository } from './repository/UserRepository';

const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || '3001';
const localConnString = 'postgres://postgres@localhost:5432/steps_admin_test';
const connUrl = url.parse(process.env.DATABASE_URL || localConnString);

export const pool = new Pool({
  user: connUrl.auth.split(':')[0],
  password: connUrl.auth.split(':')[1],
  host: connUrl.hostname,
  database: connUrl.pathname.slice(1), // drop leading slash
  port: parseInt(connUrl.port),
});

// TEMPORARY: Seed Org (id: 1) and Coach (id: 1) needed for Client creation
new OrgRepository(pool).seed();
new UserRepository(pool).seed();

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

// register express routes from defined application routes
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

// Error handling
if (process.env.NODE_ENV !== 'production') {
  app.use((err, req, res, next) => {
    res.status(500);
    res.render('error', { error: err });
  });
} else {
  app.use((err, req, res, next) => {
    res.status(500).send({ error: 'Server error' });
  });
}

// start express server
app.listen(PORT);
console.log(`Express server has started on port ${PORT}.`);
process.env.NODE_ENV !== 'production'
  ? console.log('docs at: /api-docs')
  : false;
