import { NextFunction, Request, Response } from 'express';
import { UserRepository, User, UserType } from '../repository/UserRepository';
import { pool } from '../index';

export class ClientController {
  private repo = new UserRepository(pool);
  private currentCoach = 1;

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.getAllByType('Client');
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOneByType(request.params.id, 'Client');
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const newClient = new User(request.body);
    response.status(201); // created
    const client = await this.repo.saveByType(newClient, 'Client');
    return client;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.deleteByType(request.params.id, 'Client');
    return { deleted: num };
  }

  async tasks(request: Request, response: Response, next: NextFunction) {
    return this.repo.tasks(request.params.id, this.currentCoach);
  }

  async messages(request: Request, response: Response, next: NextFunction) {
    return this.repo.messages(request.params.id, this.currentCoach);
  }

  async viewed_media(request: Request, response: Response, next: NextFunction) {
    return this.repo.viewed_media(request.params.id, this.currentCoach);
  }

  async create_viewed_media(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const res = this.repo.create_viewed_media(
      request.params.id,
      request.params.media_id,
    );
    response.status(201);
    return res;
  }

  async delete_viewed_media(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const num = this.repo.delete_viewed_media(
      request.params.id,
      request.params.media_id,
    );
    return { deleted: num };
  }

  async requests(request: Request, response: Response, next: NextFunction) {
    return this.repo.requests(request.params.id, this.currentCoach);
  }
}
