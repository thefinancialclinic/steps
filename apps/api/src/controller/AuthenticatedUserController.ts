import { NextFunction, Request, Response } from 'express';
import { UserRepository, User } from '../repository/UserRepository';
import { pool } from '../index';

export class AuthenticatedUserController {
  private repo = new UserRepository(pool);

  async one(request: Request, response: Response, next: NextFunction) {
    const email = request.user['http://steps-admin.herokuapp.com/email'];
    return this.repo.getByEmail(email);
  }
}
