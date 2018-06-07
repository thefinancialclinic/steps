import { UserRepository, User } from '../src/repository/UserRepository';
import { getTestConnectionPool, fixtures } from './db_helper';

let activeConn;

describe('User entity operations', () => {
  let user: User;
  let repo: UserRepository;

  beforeAll(async () => {
    const pool = await getTestConnectionPool({ createFixtures: true });
    repo = new UserRepository(pool);
    user = await repo.save(
      new User({
        first_name: 'FIRST',
        last_name: 'LAST',
        email: 'EMAIL',
        phone: 'PHONE',
        org_id: fixtures.org.id,
        color: 'COLOR',
        goals: ['walk', 'run'],
        status: 'AWAITING_HELP',
        type: 'Client',
        updated: new Date(),
        platform: 'SMS',
        follow_up_date: new Date(),
        plan_url: 'http://plan.example.com',
        checkin_times: [
          {
            topic: 'TOPIC',
            message: 'MESSAGE',
            time: new Date(),
          },
        ],
      }),
    );
  });

  afterAll(async () => {
    repo.delete(user.id);
  });

  it('find a user', async () => {
    let actual = await repo.getOne(user.id);
    expect(actual.id).toBe(user.id);
    expect(actual.checkin_times[0].topic).toBe('TOPIC');
  });

  it('gets all users', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(foundUser => foundUser.id == user.id).length).toBe(1);
  });
});
