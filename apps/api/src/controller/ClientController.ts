import { NextFunction, Request, Response } from 'express';
import {
  UserRepository,
  User,
  UserType,
  UserId,
} from '../repository/UserRepository';
import { pool } from '../index';
import { Task } from '../repository/TaskRepository';
import { Message } from '../repository/MessageRepository';
import { RequestItem } from '../repository/RequestRepository';
import { Media } from '../repository/MediaRepository';
import { EmailService } from '../services/Email';
import { check_if_present } from '../util';

const queryParams = (user, query = {}) => {
  const filter = {
    Superadmin: { type: 'Client' },
    Admin: { type: 'Client', org_id: user.org_id },
    Coach: { type: 'Client', coach_id: user.id },
    Client: { type: 'Client', id: user.id },
  }[user.type];
  return Object.assign(query, filter);
};

const ensureOwnership = (body, user) => {
  const filter = {
    Superadmin: { type: 'Client' },
    Admin: { type: 'Client', org_id: user.org_id },
    Coach: { type: 'Client', org_id: user.org_id, coach_id: user.id },
  }[user.type];
  return Object.assign(body, filter);
};

export class ClientController {
  private repo = new UserRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const result = this.repo.get(queryParams(request.user));
      return result;
    } catch (err) {
      throw `Cannot get clients (${err})`;
    }
  }

  async one(request, response, next) {
    try {
      const result = await this.repo.get(
        queryParams(request.user, { id: request.params.id }),
      );
      if (result.length > 0) {
        return result[0];
      } else {
        return response.status(404).send({ message: 'Not found' });
      }
    } catch (err) {
      throw `Cannot get client (${err})`;
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const client = await this.repo.save(
        ensureOwnership(request.body, request.user),
      );
      response.status(201); // created
      await new EmailService(pool).sendClientWelcome(client);
      return client;
    } catch (err) {
      throw `Could not create Client (${err})`;
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const userId: number = parseInt(request.params.id);
      const user = await this.repo.update(request.body, { id: userId });
      return user;
    } catch (err) {
      throw `Unable to update user (${err})`;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.deleteByType(request.params.id, 'Client');
    return { deleted: num };
  }

  async tasks(request: Request, response: Response, next: NextFunction) {
    return this.repo.tasks(request.params.id);
  }

  async messages(request: Request, response: Response, next: NextFunction) {
    return this.repo.messages(request.params.id);
  }

  async viewed_media(request: Request, response: Response, next: NextFunction) {
    return this.repo.viewed_media(request.params.id);
  }

  async create_viewed_media(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const res = this.repo.create_viewed_media(
      request.params.id,
      request.params.media_id,
    );
    response.status(201);
    return res;
  }

  async delete_viewed_media(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    const num = this.repo.delete_viewed_media(
      request.params.id,
      request.params.media_id,
    );
    return { deleted: num };
  }

  async requests(request: Request, response: Response, next: NextFunction) {
    return this.repo.requests(request.params.id);
  }

  async isAllowed({ user, params, method, body }) {
    const subjectId = params.id;
    try {
      let subject = null;
      if (subjectId) {
        const result = await this.repo.get({ id: subjectId });
        if (result && result.length > 0) {
          subject = result[0];
        }
      }

      return (
        {
          Superadmin: {
            GET: () => true,
            POST: () => true,
            PUT: () => true,
            DELETE: () => true,
          },
          Admin: {
            GET: () =>
              check_if_present(subject, () => subject.org_id === user.org_id),
            POST: () =>
              check_if_present(
                body.org_id,
                () => parseInt(body.org_id) === user.org_id,
              ),
            PUT: () =>
              check_if_present(subject, () => subject.org_id === user.org_id),
            DELETE: () =>
              check_if_present(subject, () => subject.org_id === user.org_id),
          },
          Coach: {
            GET: () =>
              check_if_present(subject, () => subject.coach_id === user.id),
            POST: () =>
              check_if_present(subject, () => subject.coach_id === user.id),
            PUT: () =>
              check_if_present(subject, () => subject.coach_id === user.id),
            DELETE: () =>
              check_if_present(subject, () => subject.coach_id === user.id),
          },
          Client: {
            GET: () => check_if_present(subject, () => subject.id === user.id),
            POST: () => false,
            PUT: () => check_if_present(subject, () => subject.id === user.id),
            DELETE: () => false,
          },
        }[user.type][method]() || false
      );
    } catch (err) {
      return false;
    }
  }
}
