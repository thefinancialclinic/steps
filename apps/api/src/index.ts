import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express = require('express');
import { resolve } from 'path';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Request, Response } from 'express';
import { Routes } from './routes';
import { User } from './entity/User';
import { Task } from './entity/Task';

const PORT = process.env.PORT || '3001';

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    if (process.env.NODE_ENV !== 'production') app.use(cors());
    else {
      app.use(express.static(resolve(__dirname, '..', '..', 'admin', '.build')));
    }

    // register express routes from defined application routes
    Routes.forEach(route => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then(
              result =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(PORT);

    // insert new users for test
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: 'Timber',
        lastName: 'Saw',
        age: 27
      })
    );
    await connection.manager.save(
      connection.manager.create(User, {
        firstName: 'Phantom',
        lastName: 'Assassin',
        age: 24
      })
    );
    await connection.manager.save(
      connection.manager.create(Task, {
        steps: { cat: 'yes' },
        content: 'This is text'
      } as any)
    );

    console.log(
      `Express server has started on port ${PORT}. Open http://localhost:${PORT}/users to see results`
    );
  })
  .catch(error => console.log(error));
