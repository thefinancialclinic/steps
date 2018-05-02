import { TaskTemplate } from '../src/entity/TaskTemplate';
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection } from './db_helper';

let activeConn: Connection;

describe('TaskTemplate entity operations', () => {
  let taskTemplateId: number;

  // create a test TaskTemplate
  beforeAll(async () => {
    activeConn = await getTestConnection();
    const taskTemplate = new TaskTemplate();
    const savedTaskTemplate = await activeConn.manager.save(taskTemplate);
    taskTemplateId = savedTaskTemplate.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    activeConn.createQueryBuilder()
      .delete()
      .from(TaskTemplate)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a TaskTemplate', async () => {
    const actual = await activeConn.getRepository(TaskTemplate).findOne(taskTemplateId);
    expect(actual.id).toBe(taskTemplateId);
  }); // end test

}); // end describe
