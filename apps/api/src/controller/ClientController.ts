import { NextFunction, Request, Response } from 'express';
import {
  UserRepository,
  User,
  UserType,
  UserId,
} from '../repository/UserRepository';
import { pool } from '../db';
import { Task } from '../repository/TaskRepository';
import { Message } from '../repository/MessageRepository';
import { RequestItem } from '../repository/RequestRepository';
import { Media } from '../repository/MediaRepository';
import { EmailService } from '../services/Email';
import { extend } from './Controller';

const queryParams = (user, query = {}) => {
  const filter = {
    Superadmin: { type: 'Client' },
    Admin: { type: 'Client', org_id: user.org_id },
    Coach: { type: 'Client', org_id: user.org_id, coach_id: user.id },
    Client: { type: 'Client', id: user.id },
  }[user.type];
  return { ...query, ...filter };
};

const ensureOwnership = (body, user) => {
  const filter = {
    Superadmin: { type: 'Client' },
    Admin: { type: 'Client', org_id: user.org_id },
    Coach: { type: 'Client', org_id: user.org_id, coach_id: user.id },
  }[user.type];
  return { ...body, ...filter };
};

const repo = new UserRepository(pool);

export const ClientController = extend({
  all: async (request, response, next) => {
    const result = await repo.get(queryParams(request.user));
    return response.send(result);
  },

  one: async (request, response, next) => {
    const { user, params } = request;
    if (user.type === 'Client' && user.id != params.id) throw `NOT_FOUND`;

    const result = await repo.get(
      queryParams(request.user, { id: request.params.id }),
    );
    if (result.length > 0) {
      return response.send(result[0]);
    } else {
      return response.status(404).send({ message: 'Not found' });
    }
  },

  save: async (request, response, next) => {
    const client = await repo.save(ensureOwnership(request.body, request.user));
    await new EmailService(pool).sendClientWelcome(client);
    return response.status(201).send(client);
  },

  update: async (request, response, next) => {
    const { user, params } = request;
    if (user.type === 'Client' && user.id != params.id) throw `NOT_FOUND`;

    const userId: number = parseInt(request.params.id);
    const res = await repo.update(
      request.body,
      ensureOwnership({ id: request.params.id }, request.user),
    );
    return response.send(res);
  },

  remove: async (request, response, next) => {
    const num = await repo.delete(
      request.params.id,
      ensureOwnership({}, request.user),
    );
    return response.send({ deleted: num });
  },

  tasks: async (request, response, next) => {
    const res = await repo.tasks(request.params.id, queryParams(request.user));
    return response.send(res);
  },

  messages: async (request, response, next) => {
    const res = await repo.messages(
      request.params.id,
      queryParams(request.user),
    );
    return response.send(res);
  },

  viewed_media: async (request, response, next) => {
    const res = await repo.viewed_media(request.params.id);
    return response.send(res);
  },

  create_viewed_media: async (request, response, next) => {
    const res = await repo.create_viewed_media(
      request.params.id,
      request.params.media_id,
    );
    response.status(201);
    return response.status(201).send(res);
  },

  delete_viewed_media: async (request, response, next) => {
    const num = await repo.delete_viewed_media(
      request.params.id,
      request.params.media_id,
    );
    return response.send({ deleted: num });
  },

  requests: async (request, response, next) => {
    const res = await repo.requests(
      request.params.id,
      queryParams(request.user),
    );
    response.send(res);
  },
});
