import { NextFunction, Request } from 'express';
import { Response } from 'express-serve-static-core';

import { UserRepository, User, UserId } from '../repository/UserRepository';
import { extend } from './Controller';
import { pool } from '../db';

const queryParams = (user, query = {}) => {
  const isSelf = 'id' in query && user.id === query['id'];
  const filter = {
    Superadmin: { type: 'Coach' },
    Admin: { type: 'Coach', org_id: user.org_id },
    Coach: { type: 'Coach', org_id: user.org_id },
    Client: { type: 'Coach', id: user.coach_id },
  }[user.type];
  return { ...query, ...filter };
};

const repo = new UserRepository(pool);

export const CoachController = extend({
  all: async (request, response, next) => {
    const res = await repo.get(queryParams(request.user));
    return response.send(res);
  },

  one: async (request, response, next) => {
    const res = await repo.get(
      queryParams(request.user, { id: request.params.id }),
    );
    if (res.length === 0) throw `NOT_FOUND`;
    return response.send(res[0]);
  },

  save: async (request, response, next) => {
    const res = await repo.save(queryParams(request.user, request.body));
    return response.status(201).send(res);
  },

  remove: async (request, response, next) => {
    const num = await repo.delete(request.params.id, queryParams(request.user));
    return response.send({ deleted: num });
  },
});
