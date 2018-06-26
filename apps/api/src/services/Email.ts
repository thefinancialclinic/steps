import { pool } from '../index';
import { UserRepository, User } from '../repository/UserRepository';
import { OrgRepository, Org } from '../repository/OrgRepository';
import { Pool } from 'pg';

export type ObjectType = {
  [key: string]: string | number | boolean | ObjectType;
};

export interface SendgridMessage {
  to: string;
  from: string;
  subject: string;
  templateId: string;
  substitutions: ObjectType;
}

export interface SendgridClient {
  setApiKey: (apiKey: string) => void;
  setSubstitutionWrappers: (open: string, close: string) => void;
  send: (message: SendgridMessage) => void;
}

const sendgridClient = require('@sendgrid/mail') as SendgridClient;

export class EmailService {
  sendgrid: SendgridClient;
  org_repo: OrgRepository;
  user_repo: UserRepository;

  constructor(dbPool: Pool, client: SendgridClient = sendgridClient) {
    this.sendgrid = client;
    this.sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    this.sendgrid.setSubstitutionWrappers('{{', '}}');
    this.org_repo = new OrgRepository(dbPool);
    this.user_repo = new UserRepository(dbPool);
  }

  sendMessage(message) {
    if (process.env.SENDGRID_ENABLED === 'true') {
      this.sendgrid.send(message);
    } else {
      console.log('-------- Sendgrid message --------');
      console.log(message);
      console.log('----------------------------------');
    }
  }

  async sendClientWelcome(client: User) {
    const { email, first_name, last_name, org_id, coach_id, plan_url } = client;
    const org = await this.org_repo.getOne(org_id);
    const org_name = org.name;
    const coach = await this.user_repo.getOne(coach_id);
    const coach_name = coach.first_name;
    const message = {
      to: email,
      from: 'support@helloroo.org',
      subject: 'Welcome!',
      templateId: '9fd3b210-7254-4945-88fd-21a9a9765475',
      substitutions: {
        clientFirstname: first_name,
        clientLastname: last_name,
        chatbotName: 'Roo',
        orgName: org_name,
        coachName: coach_name,
        clientPlanUrl: plan_url,
      },
    };
    this.sendMessage(message);
  }
}
