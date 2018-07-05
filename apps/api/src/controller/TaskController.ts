import { NextFunction, Request } from 'express';
import { Response } from 'express-serve-static-core';

import { TaskRepository, Task } from '../repository/TaskRepository';
import { User } from '../repository/UserRepository';
import { extend } from './Controller';
import { pool } from '../db';

const isEmpty = (obj: object): boolean => {
  return Object.getOwnPropertyNames(obj).length === 0;
};

const repo = new TaskRepository(pool);

const queryParams = (user, query = {}) => {
  const filter = {
    Superadmin: {},
    Admin: { created_by: user.org_id }, // all from org
    Coach: { created_by: user.org_id }, // all from org, & owner
    Client: { user_id: user.id }, // assigned to this user
  }[user.type];
  return { ...query, ...filter };
};

export const TaskController = extend({
  all: async (request, response, next) => {
    const { user } = request;
    if (user.type === 'Superadmin') {
      if (isEmpty(request.query)) {
        return response.send(await repo.getAll());
      } else {
        return response.send(await repo.filterAll(request.query));
      }
    } else {
      const templateTasks = await repo.getTemplateTasks();
      if (user.type === 'Admin') {
        const orgTasks = await repo.getOrgTasks(user.org_id);
        return response.send([...templateTasks, ...orgTasks]);
      } else if (user.type === 'Coach') {
        const orgTasks = await repo.getCreatedByOrgCoaches(user.org_id);
        const clientTasks = await repo.getAssignedByCoach(user.id);
        return response.send([...templateTasks, ...orgTasks, ...clientTasks]);
      } else if (request.user.type === 'Client') {
        return response.send(await repo.get({ user_id: user.id }));
      }
    }
  },

  one: async (request, response, next) => {
    const res = await repo.get(
      queryParams(request.user, { id: request.params.id }),
    );
    if (res.length > 0) {
      return response.send(res[0]);
    } else {
      return response.status(404).send({ message: 'Not found' });
    }
  },

  save: async (request, response, next) => {
    const task = await repo.save(request.body);
    return response.status(201).send(task);
  },

  remove: async (request, response, next) => {
    const num = await repo.delete(request.params.id);
    return response.send({ deleted: num });
  },

  update: async (request, response, next) => {
    const taskId = parseInt(request.params.id);
    const res = await repo.update(request.body, taskId);
    return response.send(res);
  },

  updateMany: async (request, response, next) => {
    const tasks = request.body;
    const result = tasks.map(async t => await repo.update(t, parseInt(t.id)));

    const res = await Promise.all(result);
    return response.send(res);
  },
});
