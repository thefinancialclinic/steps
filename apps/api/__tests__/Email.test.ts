import 'jest';
import { EmailService } from '../src/services/Email';
import { OrgRepository, Org } from '../src/repository/OrgRepository';
import { UserRepository, User } from '../src/repository/UserRepository';

import { getTestConnectionPool, Pool } from './db_helper';

let sendgridEnabled,
  baseUrl,
  mockSendgridClient,
  email,
  pool,
  orgRepo,
  userRepo,
  org,
  coach;

describe('Email service', () => {
  beforeAll(async () => {
    sendgridEnabled = process.env.SENDGRID_ENABLED;
    baseUrl = process.env.BASE_URL;
    process.env.SENDGRID_ENABLED = 'true';
    process.env.BASE_URL = 'https://example.com';
    pool = await getTestConnectionPool({ createFixtures: true });
    orgRepo = new OrgRepository(pool);
    userRepo = new UserRepository(pool);
    org = await orgRepo.save({
      name: 'Org',
    });
    coach = await userRepo.save({
      first_name: 'Coach',
      last_name: 'Last',
      email: 'coach@example.com',
      org_id: org.id,
      goals: [],
      status: 'WORKING',
      type: 'Coach',
    });
  });

  afterAll(async () => {
    process.env.SENDGRID_ENABLED = sendgridEnabled;
    process.env.BASE_URL = baseUrl;
    await userRepo.delete(coach.id);
    await orgRepo.delete(org.id);
    await pool.end();
  });

  beforeEach(() => {
    mockSendgridClient = {
      setApiKey: jest.fn(),
      setSubstitutionWrappers: jest.fn(),
      send: jest.fn(),
    };
    email = new EmailService(pool, mockSendgridClient);
  });

  it('sets API key', () => {
    expect(mockSendgridClient.setApiKey).toHaveBeenCalled();
  });

  it('sets substitution wrappers', () => {
    expect(mockSendgridClient.setSubstitutionWrappers).toHaveBeenCalledWith(
      '{{',
      '}}',
    );
  });

  it('extracts client params', async () => {
    await email.sendClientWelcome({
      first_name: 'First',
      last_name: 'Last',
      email: 'client@example.com',
      org_id: org.id,
      coach_id: coach.id,
      plan_url: 'https://example.com',
    });
    expect(mockSendgridClient.send).toHaveBeenCalledWith({
      to: 'client@example.com',
      from: 'support@helloroo.org',
      subject: 'Welcome!',
      templateId: '9fd3b210-7254-4945-88fd-21a9a9765475',
      substitutions: {
        clientFirstname: 'First',
        clientLastname: 'Last',
        chatbotName: 'Roo',
        orgName: 'Org',
        coachName: 'Coach',
        clientPlanUrl: 'https://example.com/my-tasks',
      },
    });
  });
});
