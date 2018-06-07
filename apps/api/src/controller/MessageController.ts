import { NextFunction, Request, Response } from 'express';
import { MessageRepository, Message } from '../repository/MessageRepository';
import { pool } from '../index';

export class MessageController {
  private repo = new MessageRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.getAll();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const message = new Message(request.body);
    response.status(201); // created
    const messageId = await this.repo.save(message);
    return { id: messageId };
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.delete(request.params.id);
    return { deleted: num };
  }
}
