import { NextFunction, Request, Response } from 'express';
import { TaskRepository, Task } from '../repository/TaskRepository';
import { pool } from '../index';

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
    const task = await this.repo.save(request.body);
    response.status(201); // created
    return task;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.delete(request.params.id);
    return { deleted: num };
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const task = new Task(request.body);
    task.id = request.params.id || task.id;
    const result = await this.repo.update(task);
    response.status(200);
    return result;
  }
}
