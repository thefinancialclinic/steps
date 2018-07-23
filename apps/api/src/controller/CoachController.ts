import { NextFunction, Request, Response } from 'express';
import { UserRepository, User, UserId } from '../repository/UserRepository';
import { pool } from '../index';
import { check_if_present } from '../util';

const queryParams = user => {
  return {
    Superadmin: { type: 'Coach' },
    Admin: { type: 'Coach', org_id: user.org_id },
    Coach: { type: 'Coach', id: user.id },
  }[user.type];
};

export class CoachController {
  private repo = new UserRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.repo.get(queryParams(request.user));
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOneByType(request.params.id, 'Coach');
  }

  async save(request: Request, response: Response, next: NextFunction) {
    response.status(201); // created
    const coach = await this.repo.saveByType(request.body, 'Coach');
    return coach;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.deleteByType(request.params.id, 'Coach');
    return { deleted: num };
  }

  async isAllowed({ user, params, method, body }) {
    try {
      let subject = null;
      if (params.id) {
        const result = await this.repo.get({ id: params.id });
        if (result && result.length > 0) {
          subject = result[0];
        }
      }

      return (
        {
          Superadmin: {
            GET: true,
            POST: true,
            PUT: true,
            DELETE: true,
          },
          Admin: {
            GET: check_if_present(
              subject,
              () => subject.org_id === user.org_id,
            ),
            POST: check_if_present(
              body.org_id,
              () => parseInt(body.org_id) === user.org_id,
            ),
            PUT: true,
            DELETE: check_if_present(
              subject,
              () => subject.org_id === user.org_id,
            ),
          },
          Coach: {
            GET: check_if_present(subject, () => subject.id === user.id),
            POST: false,
            PUT: check_if_present(subject, () => subject.id === user.id),
            DELETE: false,
          },
          Client: {
            GET: false,
            POST: false,
            PUT: false,
            DELETE: false,
          },
        }[user.type][method] || false
      );
    } catch (err) {
      return false;
    }
  }
}
