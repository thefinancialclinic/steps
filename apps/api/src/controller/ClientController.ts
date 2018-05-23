import { NextFunction, Request, Response } from "express";
import { UserRepository, User, UserType } from "../repository/UserRepository";
import { pool } from "../index";

export class ClientController {
  private repo = new UserRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.getAllByType('Client');
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOneByType(request.params.id, 'Client');
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const client = new User(request.body);
    return this.repo.saveByType(client, 'Client');
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    await this.repo.deleteByType(request.params.id, 'Client');
  }
}
