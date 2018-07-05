import { NextFunction, Request, Response } from 'express';

import { MessageRepository, Message } from '../repository/MessageRepository';
import { User } from '../repository/UserRepository';
import { pool } from '../db';
import { extend } from './Controller';

const repo = new MessageRepository(pool);

export const MessageController = extend({
  all: async (request, response, next) => {
    if (request.user.type == 'Admin') {
      return response.send(
        await repo.getAllMessagesForOrg(request.user.org_id),
      );
    }
    return response.send(await repo.getAllMessagesForUser(request.user.id));
  },

  one: async (request, response, next) => {
    const res = await repo.get({ id: request.params.id });
    if (res.length > 0) {
      return response.send(res[0]);
    } else {
      return response.status(404).send({ message: 'Not found' });
    }
  },

  save: async (request, response, next) => {
    const res = await repo.save(request.body);
    return response.status(201).send(res);
  },

  remove: async (request, response, next) => {
    const num = await repo.delete(request.params.id);
    return response.send({ deleted: num });
  },
});
