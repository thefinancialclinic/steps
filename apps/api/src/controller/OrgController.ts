import { NextFunction, Request, Response } from 'express';
import { OrgRepository, Org } from '../repository/OrgRepository';
import { User } from '../repository/UserRepository';
import { pool } from '../db';
import { extend } from './Controller';

const queryParams = user => {
  return {
    Admin: { id: user.org_id },
    Coach: { id: user.org_id },
  }[user.type];
};

const repo = new OrgRepository(pool);

export const OrgController = extend({
  all: async (request: Request, response: Response, next: NextFunction) => {
    const res = await repo.get(queryParams(request.user));
    response.send(res);
  },

  one: async (request: Request, response: Response, next: NextFunction) => {
    const res = await repo.getOne(request.params.id);
    response.send(res);
  },

  save: async (request: Request, response: Response, next: NextFunction) => {
    const res = await repo.save(request.body);
    response.status(201).send(res);
  },

  remove: async (request: Request, response: Response, next: NextFunction) => {
    const num = await repo.delete(request.params.id);
    response.send({ deleted: num });
  },
});
