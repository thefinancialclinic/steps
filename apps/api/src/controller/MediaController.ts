import { NextFunction, Request, Response } from 'express';
import { MediaRepository, Media } from '../repository/MediaRepository';
import { User } from '../repository/UserRepository';
import { pool } from '../index';
import { check_if_present } from '../util';

const queryParams = user => {
  return {
    Superadmin: { type: 'Client' },
    Admin: { type: 'Client', org_id: user.org_id },
    Coach: { type: 'Client', coach_id: user.id },
    Client: { type: 'Client', id: user.id },
  }[user.type];
};

const ensureOwnership = (body, user) => {
  const filter = {
    Superadmin: { type: 'Client' },
    Admin: { type: 'Client', org_id: user.org_id },
    Coach: { type: 'Client', org_id: user.org_id, coach_id: user.id },
  }[user.type];
  return Object.assign(body, filter);
};

export class MediaController {
  private repo = new MediaRepository(pool);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      switch (request.user.type) {
        case 'Client':
          return this.repo.byOwner(request.user.id);
        default:
          return this.repo.getAll();
      }
    } catch (err) {
      throw `Could not list all Media (${err})`;
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.repo.getOne(request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const newMedia = new Media(request.body);
    response.status(201); // created
    const media = await this.repo.save(newMedia);
    return media;
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.delete(request.params.id);
    return { deleted: num };
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const mediaId: number = parseInt(request.params.id);
      const result = await this.repo.update(request.body, mediaId);
      return result;
    } catch (err) {
      throw `Unable to update media (${err})`;
    }
  }

  async isAllowed({ user, params }): Promise<boolean> {
    try {
      let subject: User | null = null;
      if (params.id) {
        const owner = await this.repo.owner(params.id);
        if (owner && owner.length > 0) {
          subject = owner[0];
        }
      }
      return (
        {
          Superadmin: true,
          Admin: true,
          Coach: true,
          Client: check_if_present(subject, () => user.id === subject.id),
        }[user.type] || false
      );
    } catch (err) {
      return false;
    }
  }
}
