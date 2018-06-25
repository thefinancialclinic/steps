import { NextFunction, Request, Response } from 'express';
import { UserRepository, User } from '../repository/UserRepository';
import { pool } from '../index';

export class AuthController {
  private userRepo = new UserRepository(pool);

  async user(request: Request, response: Response, next: NextFunction) {
    const [_provider, id] = request.user.sub.split('|');
    return this.userRepo.getByAuth0Id(id);
  }
}
