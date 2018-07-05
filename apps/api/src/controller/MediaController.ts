import { NextFunction, Request, Response } from 'express';

import { MediaRepository, Media } from '../repository/MediaRepository';
import { User } from '../repository/UserRepository';
import { pool } from '../db';
import { extend } from './Controller';

const queryParams = user => {
  return {
    Superadmin: { type: 'Client' },
    Admin: { type: 'Client', org_id: user.org_id },
    Coach: { type: 'Client', coach_id: user.id },
    Client: { type: 'Client', id: user.id },
  }[user.type];
};

const ensureOwnership = (body, user) => {
  const filter = {
    Superadmin: { type: 'Client' },
    Admin: { type: 'Client', org_id: user.org_id },
    Coach: { type: 'Client', org_id: user.org_id, coach_id: user.id },
  }[user.type];
  return Object.assign(body, filter);
};

const repo = new MediaRepository(pool);

export const MediaController = extend({
  all: async (request, response, next) => {
    if (request.user.type === 'Client') {
      return repo.byOwner(request.user.id);
    } else {
      return repo.getAll();
    }
  },

  one: async (request, response, next) => {
    let res: Media[];
    if (request.user.type === 'Client') {
      res = await repo.byOwner(request.user.id, request.params.id);
    } else {
      res = await repo.get({ id: request.params.id });
    }

    if (res.length > 0) {
      return response.send(res[0]);
    } else {
      return response.status(404).send({ message: 'Not found' });
    }
  },

  save: async (request, response, next) => {
    const media = await repo.save(request.body);
    return response.status(201).send(media);
  },

  remove: async (request, response, next) => {
    const num = await repo.delete(request.params.id);
    return response.send({ deleted: num });
  },
});
