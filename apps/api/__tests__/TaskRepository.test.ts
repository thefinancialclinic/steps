import { TaskRepository, Task } from '../src/repository/TaskRepository';
import { fixtures, getTestConnectionPool, Pool } from './db_helper';

let activeConn;

describe('Task entity operations', () => {
  let pool: Pool;
  let task: Task;
  let repo: TaskRepository;
  let dateAssigned = new Date();

  beforeAll(async () => {
    pool = await getTestConnectionPool({ createFixtures: true });
    repo = new TaskRepository(pool);
    task = await repo.save(
      new Task({
        title: 'TITLE',
        category: 'CATEGORY',
        description: 'DESCRIPTION',
        status: 'ACTIVE',
        created_by: fixtures.org.id,
        user_id: fixtures.user.id,
        difficulty: 'EASY',
        date_created: new Date(),
        date_completed: new Date(),
        date_assigned: dateAssigned,
        steps: [{ text: 'TEXT1' }, { text: 'TEXT2', note: 'NOTE2' }],
        original_task_id: fixtures.task.id,
        order: 1,
      }),
    );
  });

  afterAll(async () => {
    await repo.delete(task.id);
    await pool.end();
  });

  it('find a task', async () => {
    let actual = await repo.get({ id: task.id });
    expect(actual[0].id).toBe(task.id);
  });

  it('gets all tasks', async () => {
    let actual = await repo.get();
    expect(actual.filter(x => x.id == task.id).length).toBe(1);
  });

  it('updates the task', async () => {
    const expectedTitle = 'NEW TITLE';
    let newTask = await repo.get({ id: task.id });
    newTask[0].title = expectedTitle;
    const actual = await repo.update(newTask[0], task.id);
    expect(actual.title).toBe(expectedTitle);
  });

  it('can retrieve steps', async () => {
    const subject = await repo.get({ id: task.id });
    expect(subject[0].steps[1].note).toBe('NOTE2');
  });

  it('can partially update a task', async () => {
    const subject = await repo.update({ title: 'New title' }, task.id);
    expect(subject.title).toBe('New title');
    expect(subject.category).toBe('CATEGORY'); // unchanged
  });

  it('has an assigned date', async () => {
    const subject = await repo.get({ id: task.id });
    expect(subject[0].date_assigned.toLocaleDateString()).toBe(
      dateAssigned.toLocaleDateString(),
    );
  });

  it('links back to an original task (template)', async () => {
    const subject = await repo.get({ id: task.id });
    expect(subject[0].original_task_id).toBe(fixtures.task.id);
  });

  it('Tasks have an order field (and are sorted by it)', async () => {
    // subtle: fixture has order=2 & is created first, the task here has order=1
    const subjects = await repo.get({});
    const expected = subjects.map(t => t.order).sort();
    expect(subjects.map(task => task.order)).toEqual(expected);
  });
});
