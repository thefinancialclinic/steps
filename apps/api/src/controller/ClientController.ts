import { NextFunction, Request, Response } from 'express';
const CryptoJS = require('crypto-js');
var rp = require('request-promise');
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

const getBaseUrl = () =>
  process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL
    : 'http://localhost:3000';

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
    let client;
    try {
      client = request.body;
      // the cipher is used as the client's auth0 password
      // when received via the URL, it must be decrypted to get the email
      // so that the FE can login the user
      const ciphertext = CryptoJS.AES.encrypt(
        client.email,
        process.env.CLIENT_ACCESS_SECRET,
      );
      // encode ciphertext so all necessary characters are escaped in the URI
      const encodedCipher = encodeURIComponent(ciphertext);
      // build URL string
      client.plan_url = `${getBaseUrl()}/plan/${encodedCipher}`;
      const auth0User = await rp({
        method: 'POST',
        uri: `https://${process.env.AUTH0_ISSUER}dbconnections/signup`,
        body: {
          connection: 'Username-Password-Authentication',
          email: client.email,
          password: ciphertext.toString(),
        },
        json: true, // Automatically stringifies the body to JSON
      });
      client.auth0_id = auth0User._id;
      client.type = 'Client';
      let savedClient = await this.repo.save(
        ensureOwnership(request.body, request.user),
      );

      response.status(201); // created
      await new EmailService(pool).sendClientWelcome(savedClient);
      return savedClient;
    } catch (err) {
      throw `Could not create user - ${client.email} - (${err.message})`;
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    let userId: number;
    try {
      userId = parseInt(request.params.id);
      const user = await this.repo.update(request.body, { id: userId });
      return user;
    } catch (err) {
      throw `Unable to update user (${err}), ${userId}`;
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const num = await this.repo.deleteByType(request.params.id, 'Client');
    return { deleted: num };
  }

  async tasks(request: Request, response: Response, next: NextFunction) {
    return this.repo.tasks(request.params.id);
  }

  async validateCipher(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const { ciphertext } = request.body;
      // decode the encrypted string
      const unencodedStr = decodeURIComponent(ciphertext);
      // decrypt the encrypted string
      const bytes = CryptoJS.AES.decrypt(
        unencodedStr,
        process.env.CLIENT_ACCESS_SECRET,
      );
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      response.status(200);
      return { email: plaintext };
    } catch (err) {
      throw `Error validating cipher (${err})`;
    }
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
