import { Task } from '../src/entity/Task';
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection, fixtures } from './db_helper';

let activeConn: Connection;

describe('Task entity operations', () => {
  let taskId: number;

  // Create 1 known task
  beforeAll(async () => {
    activeConn = await getTestConnection({ createFixtures: true });
    const task = new Task();
    task.content = 'some content';
    task.steps = { 'some': 'json' }
    task.client = fixtures.client;
    task.org = fixtures.org;
    const savedTask = await activeConn.manager.save(task);
    taskId = savedTask.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    await activeConn.createQueryBuilder()
      .delete()
      .from(Task)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a user', async () => {
    const actual = await activeConn.getRepository(Task).findOne({
      content: 'some content'
    });
    expect(actual.id).toBe(taskId);
  }); // end test
}); // end describe
