import { NextFunction, Request, Response } from 'express';
import {
  RequestRepository,
  RequestItem,
} from '../repository/RequestRepository';
import { pool } from '../index';

export class RequestController {
  private repo = new RequestRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.getAll();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const requestItem = new RequestItem(request.body);
    response.status(201); // created
    const req = await this.repo.save(requestItem);
    return req;
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const requestItem = new RequestItem(request.body);
    requestItem.id = request.params.id;
    const req = await this.repo.update(requestItem);
    return req;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.delete(request.params.id);
    return { deleted: num };
  }
}
