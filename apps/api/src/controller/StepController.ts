import { NextFunction, Request, Response } from 'express';
import { StepRepository, Step } from '../repository/StepRepository';
import { pool } from '../index';

export class StepController {
  private repo = new StepRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.getAll();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const id = await this.repo.save(request.body);
    response.status(201); // created
    return { id };
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.delete(request.params.id);
    return { deleted: num };
  }
}
