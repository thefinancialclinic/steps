import { NextFunction, Request, Response } from "express";
import { OrgRepository, Org } from "../repository/OrgRepository";
import { pool } from "../index";


export class OrgController {
  private repo = new OrgRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.getAll();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.repo.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    await this.repo.delete(request.params.id);
  }
}
