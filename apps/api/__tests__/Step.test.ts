import { Step } from '../src/entity/Step';
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

describe('Step entity operations', async () => {
  let stepId: number;

  // create a test Step
  beforeAll(async () => {
    activeConn = await getTestConnection({ createFixtures: true });
    const step = new Step();
    step.text = 'TEXT';
    step.note = 'NOTE';
    step.task = fixtures.task;
    const savedStep = await activeConn.manager.save(step);
    stepId = savedStep.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    activeConn.createQueryBuilder()
      .delete()
      .from(Step)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a Step', async () => {
    const actual = await activeConn.getRepository(Step).findOne(stepId);
    expect(actual.id).toBe(stepId);
  }); // end test

}); // end describe
