import { NextFunction, Request, Response } from 'express';
import { UserRepository, UserType, User } from '../repository/UserRepository';
import { pool } from '../index';

export class CoachController {
  private repo = new UserRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.getAllByType('Coach');
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOneByType(request.params.id, 'Coach');
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const coach = new User(request.body);
    response.status(201); // created
    const coachId = await this.repo.saveByType(request.body, 'Coach');
    return { id: coachId };
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.deleteByType(request.params.id, 'Coach');
    return { deleted: num };
  }
}
