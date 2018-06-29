import { NextFunction, Request, Response } from 'express';
import { UserRepository, User } from '../repository/UserRepository';
import { pool } from '../index';
import { getUserFromAuthToken } from '../services/Auth';

export class AuthController {
  private userRepo = new UserRepository(pool);

  async user(request: Request, response: Response, next: NextFunction) {
    try {
      return getUserFromAuthToken(request, this.userRepo);
    } catch (err) {
      console.log(err);
      response.send(401);
    }
  }
}
