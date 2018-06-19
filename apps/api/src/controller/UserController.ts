import { NextFunction, Request, Response } from 'express';
import { UserRepository, User } from '../repository/UserRepository';
import { pool } from '../index';

export class UserController {
  private repo = new UserRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      return this.repo.getAll();
    } catch (err) {
      throw `Could not list all Users (${err})`;
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      return this.repo.getOne(request.params.id);
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(201);
      return this.repo.save(request.body);
    } catch (err) {
      throw `Could not create User (${err})`;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      await this.repo.delete(request.params.id);
    } catch (err) {
      throw `Could not delete User (${err})`;
    }
  }

  async isAllowed({ user, params, method }) {
    return true;
  }
}
