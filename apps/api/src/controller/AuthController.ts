import { NextFunction, Request, Response } from 'express';
import { UserRepository, User } from '../repository/UserRepository';
import { pool } from '../index';
import { getUserFromAuthToken } from '../services/Auth';
import { OrgRepository, Org } from '../repository/OrgRepository';

export class AuthController {
  private userRepo = new UserRepository(pool);
  private orgRepo = new OrgRepository(pool);

  async user(request: Request, response: Response, next: NextFunction) {
    try {
      return getUserFromAuthToken(request, this.userRepo);
    } catch (err) {
      console.log(err);
      response.sendStatus(401);
    }
  }

  async signup(request: Request, response: Response, next: NextFunction) {
    const userAttrs = request.body;
    if (userAttrs.type === 'Admin') {
      const org = await this.orgRepo.save(
        new Org({
          name: userAttrs.organization_name,
        }),
      );
      userAttrs.org_id = org.id;
    }
    userAttrs.goals = [];
    userAttrs.status = 'WORKING';
    await this.userRepo.save(new User(userAttrs));
    response.sendStatus(200);
  }
}
