import { TaskRepository, TaskId, Task } from '../src/repository/TaskRepository';
import { fixtures, getTestConnectionPool } from './db_helper';

let activeConn;

describe('Task entity operations', () => {
  let taskId: TaskId;
  let repo: TaskRepository;

  beforeAll(async () => {
    const pool = await getTestConnectionPool({ createFixtures: true })
    repo = new TaskRepository(pool);
    taskId = await repo.save(new Task({
      title: "TITLE",
      category: "CATEGORY",
      description: "DESCRIPTION",
      status: "ACTIVE",
      created_by: fixtures.org,
      user_id: fixtures.user,
      difficulty: "EASY",
      date_created: new Date(),
      date_completed: new Date(),
    }));
  });

  afterAll(async () => {
    repo.delete(taskId);
  });

  it('find a task', async () => {
    let actual = await repo.getOne(taskId);
    expect(actual.id).toBe(taskId);
  });

  it('gets all tasks', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(task => task.id == taskId).length).toBe(1);
  })
});
