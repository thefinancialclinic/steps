import { NextFunction, Request, Response } from 'express';
import { TaskRepository, Task } from '../repository/TaskRepository';
import { User } from '../repository/UserRepository';
import { pool } from '../index';
import { check_if_present } from '../util';

const isEmpty = (obj: object): boolean => {
  return Object.getOwnPropertyNames(obj).length === 0;
};

export class TaskController {
  private repo = new TaskRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    if (isEmpty(request.query)) {
      return this.repo.getAll();
    } else {
      return this.repo.filterAll(request.query);
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const task = await this.repo.save(request.body);
      response.status(201); // created
      return task;
    } catch (err) {
      throw `Could not create Task (${err})`;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.delete(request.params.id);
    return { deleted: num };
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const taskId = parseInt(request.params.id);
      const result = await this.repo.update(request.body, taskId);
      return result;
    } catch (err) {
      throw `Unable to update task (${err})`;
    }
  }
  async updateMany(request: Request, response: Response, next: NextFunction) {
    try {
      const tasks = request.body;
      const result = tasks.map(
        async t => await this.repo.update(t, parseInt(t.id)),
      );

      return Promise.all(result);
    } catch (err) {
      throw `Unable to update task (${err})`;
    }
  }

  async isAllowed({ user, params, method }) {
    try {
      const taskId = parseInt(params.id);
      const client = await this.repo.owner(taskId);
      const coach = await this.repo.creator(taskId);

      return (
        {
          Superadmin: {
            GET: () => true,
            PUT: () => true,
            POST: () => true,
            DELETE: () => true,
          },
          Admin: {
            GET: () =>
              check_if_present(taskId, () => user.org_id === client.org_id),
            PUT: () =>
              check_if_present(taskId, () => user.org_id === client.org_id),
            POST: () =>
              check_if_present(taskId, () => user.org_id === client.org_id),
            DELETE: () =>
              check_if_present(taskId, () => user.org_id === client.org_id),
          },
          Coach: {
            GET: () => check_if_present(taskId, () => user.id === coach.id),
            PUT: () =>
              check_if_present(
                taskId,
                () => client === null || user.id === coach.id,
              ),
            POST: () => check_if_present(taskId, () => user.id === coach.id),
            DELETE: () =>
              check_if_present(
                taskId,
                () => client === null || user.id === coach.id,
              ),
          },
          Client: {
            GET: () => check_if_present(taskId, () => user.id === client.id),
            PUT: () => check_if_present(taskId, () => user.id === client.id),
            POST: () => false,
            DELETE: () => false,
          },
        }[user.type][method]() || false
      );
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
