import { UserRepository, User } from '../src/repository/UserRepository';
import { TaskRepository, Task } from '../src/repository/TaskRepository';
import { fixtures, getTestConnectionPool, Pool } from './db_helper';

describe('User entity operations', () => {
  let pool: Pool;
  let user: User;
  let repo: UserRepository;

  beforeAll(async () => {
    pool = await getTestConnectionPool({ createFixtures: true });
    repo = new UserRepository(pool);
    user = await repo.save({
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
    });
  });

  afterAll(async () => {
    await repo.delete(user.id);
    await pool.end();
  });

  it('find a user', async () => {
    let actual = await repo.get({ id: user.id });
    expect(actual[0].id).toBe(user.id);
    expect(actual[0].checkin_times[0].topic).toBe('TOPIC');
  });

  it('gets all users', async () => {
    let actual = await repo.get({});
    expect(actual.filter(foundUser => foundUser.id == user.id).length).toBe(1);
  });

  it('gets a client plan_url', async () => {
    let actual = await repo.get({ id: user.id });
    expect(actual[0].plan_url).toBe('http://plan.example.com');
  });

  it('updates user topic', async () => {
    let actual = await repo.get({ id: user.id });
    expect(actual[0].topic).toBe(null);
    actual[0].topic = 'New topic';
    await repo.update(actual[0], { id: user.id });
    expect(actual[0].topic).toBe('New topic');
  });

  it('updates temp help response', async () => {
    let actual = await repo.get({ id: user.id });
    expect(actual[0].temp_help_response).toBe('RESPONSE');
    actual[0].temp_help_response = 'NEW RESPONSE';
    await repo.update(actual[0], { id: user.id });
    expect(actual[0].temp_help_response).toBe('NEW RESPONSE');
  });

  it('partially updates a user', async () => {
    const subject = await repo.update({ first_name: 'Fred' }, { id: user.id });
    expect(subject.first_name).toBe('Fred');
    expect(subject.last_name).toBe('LAST'); // unchanged
  });

  it('Update a user with empty object', async () => {
    const subject = await repo.update({}, { id: user.id });
    expect(subject.last_name).toEqual('LAST'); // unchanged
  });

  describe('tasks', () => {
    let taskRepo: TaskRepository;
    let task: Task;

    beforeAll(async () => {
      taskRepo = new TaskRepository(pool);
      task = await taskRepo.save({ ...fixtures.task, order: 1 });
    });

    afterAll(() => {
      taskRepo.delete(task.id);
    });

    it("Sorts a client's tasks", async () => {
      const subjects = await repo.tasks(fixtures.user.id);
      const expected = subjects.map(t => t.order).sort();

      expect(subjects.map(t => t.order)).toEqual(expected);
    });
  });
});
