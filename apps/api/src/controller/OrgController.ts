import { NextFunction, Request, Response } from 'express';
import { OrgRepository, Org } from '../repository/OrgRepository';
import { User } from '../repository/UserRepository';
import { pool } from '../index';
import { check_if_present } from '../util';

const queryParams = user => {
  return {
    Admin: { id: user.org_id },
    Coach: { id: user.org_id },
  }[user.type];
};

export class OrgController {
  private repo = new OrgRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.get(queryParams(request.user));
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const org = await this.repo.save(request.body);
      response.status(201); // created
      return org;
    } catch (err) {
      throw `Could not create Org (${err})`;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.delete(request.params.id);
    return { deleted: num };
  }

  async isAllowed({ user, params, method }) {
    return {
      Superadmin: {
        GET: true,
        PUT: true,
        POST: true,
        DELETE: true,
      },
      Admin: {
        GET: true,
        PUT: false,
        POST: false,
        DELETE: false,
      },
      Coach: {
        GET: true,
        PUT: false,
        POST: false,
        DELETE: false,
      },
      Client: {
        GET: true,
        PUT: false,
        POST: false,
        DELETE: false,
      },
    }[user.type][method];
  }
}
