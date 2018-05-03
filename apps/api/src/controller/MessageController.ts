import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Message } from "../entity/Message";

export class MessageController {
  private taskRepository = getRepository(Message);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.taskRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.taskRepository.findOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.taskRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    await this.taskRepository.delete(request.params.id);
  }
}
