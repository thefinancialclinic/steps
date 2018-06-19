import { UserRepository, User } from '../src/repository/UserRepository';
import { fixtures, getTestConnectionPool, Pool } from './db_helper';

let activeConn;

describe('User entity operations', () => {
  let pool: Pool;
  let user: User;
  let repo: UserRepository;

  beforeAll(async () => {
    pool = await getTestConnectionPool({ createFixtures: true });
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
        temp_help_response: 'RESPONSE',
      }),
    );
  });

  afterAll(async () => {
    await repo.delete(user.id);
    await pool.end();
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

  it('gets a client plan_url', async () => {
    let actual = await repo.getOne(user.id);
    expect(actual.plan_url).toBe('http://plan.example.com');
  });

  it('updates user topic', async () => {
    let actual = await repo.getOne(user.id);
    expect(actual.topic).toBe(null);
    actual.topic = 'New topic';
    await repo.update(actual, user.id);
    expect(actual.topic).toBe('New topic');
  });

  it('updates temp help response', async () => {
    let actual = await repo.getOne(user.id);
    expect(actual.temp_help_response).toBe('RESPONSE');
    actual.temp_help_response = 'NEW RESPONSE';
    await repo.update(actual, user.id);
    expect(actual.temp_help_response).toBe('NEW RESPONSE');
  });

  it('can partially update a user', async () => {
    const subject = await repo.update({ first_name: 'Fred' }, user.id);
    expect(subject.first_name).toBe('Fred');
    expect(subject.last_name).toBe('LAST'); // unchanged
  });
});
