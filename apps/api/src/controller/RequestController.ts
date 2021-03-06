import { NextFunction, Request, Response } from 'express';
import {
  RequestRepository,
  RequestItem,
} from '../repository/RequestRepository';
import { UserRepository, User } from '../repository/UserRepository';
import { pool } from '../index';

export class RequestController {
  private repo = new RequestRepository(pool);
  private userRepo = new UserRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.getAll();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const requestItem = new RequestItem(request.body);
    const req = await this.repo.save(requestItem);
    this.updateUserStatus(requestItem);
    response.status(201); // created
    return req;
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const requestItem = new RequestItem(request.body);
    requestItem.id = request.params.id;
    const req = await this.repo.update(requestItem);
    this.updateUserStatus(requestItem);
    return req;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.delete(request.params.id);
    return { deleted: num };
  }

  private async updateUserStatus(requestItem: RequestItem) {
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
  }

  async isAllowed({ user, params, method }) {
    return true;
  }
}
