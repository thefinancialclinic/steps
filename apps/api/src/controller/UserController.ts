import { UserRepository, User } from '../repository/UserRepository';
import { pool } from '../db';
import { extend } from './Controller';

const repo = new UserRepository(pool);

export const UserController = extend({
  all: async (request, response, next) => {
    return response.send(await repo.getAll());
  },

  one: async (request, response, next) => {
    const res = await repo.get({ id: request.params.id });
    if (res.length > 0) {
      return response.send(res[0]);
    } else {
      return response.status(404).send({ message: 'Not  found' });
    }
  },

  save: async (request, response, next) => {
    return response.status(201).send(await repo.save(request.body));
  },

  remove: async (request, response, next) => {
    const num = await repo.delete(request.params.id);
    return response.send({ deleted: num });
  },
});
