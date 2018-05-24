import { UserRepository, UserId, User } from '../src/repository/UserRepository';
import { getTestConnectionPool, fixtures } from './db_helper';

let activeConn;

describe('User entity operations', () => {
  let userId: UserId;
  let repo: UserRepository;

  beforeAll(async () => {
    const pool = await getTestConnectionPool({ createFixtures: true });
    repo = new UserRepository(pool);
    userId = await repo.save(new User({
      first_name: "FIRST",
      last_name: "LAST",
      email: "EMAIL",
      phone: "PHONE",
      org_id: fixtures.org,
      color: "COLOR",
      goals: ["walk", "run"],
      status: "AWAITING_HELP",
      type: "Client",
      updated: new Date(),
      platform: "SMS",
      follow_up_date: new Date(),
    }));
  });

  afterAll(async () => {
    repo.delete(userId);
  });

  it('find a user', async () => {
    let actual = await repo.getOne(userId);
    expect(actual.id).toBe(userId);
  });

  it('gets all users', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(user => user.id == userId).length).toBe(1);
  })
});
