import {
  RequestRepository,
  RequestItem,
} from '../repository/RequestRepository';
import { UserRepository, User } from '../repository/UserRepository';
import { pool } from '../db';
import { extend } from './Controller';

const repo = new RequestRepository(pool);
const userRepo = new UserRepository(pool);

export const RequestController = extend({
  all: async (request, response, next) => {
    return repo.getAll();
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
    this.updateUserStatus(request.body);
    return response.status(201).send(res);
  },

  update: async (request, response, next) => {
    const res = await repo.update({ id: request.params.id, ...request.body });
    this.updateUserStatus(request.body);
    return response.send(res);
  },

  remove: async (request, response, next) => {
    const num = await repo.delete(request.params.id);
    return response.send({ deleted: num });
  },

  updateUserStatus: async requestItem => {
    if (requestItem.status === 'NEEDS_ASSISTANCE') {
      await this.userRepo.update(
        { status: 'AWAITING_HELP' },
        { id: requestItem.user_id },
      );
    } else {
      await this.userRepo.update(
        { status: 'WORKING' },
        { id: requestItem.user_id },
      );
    }
  },
});
