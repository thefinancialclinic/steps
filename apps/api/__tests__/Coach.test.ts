import { Coach } from '../src/entity/Coach';
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection } from './db_helper';

let activeConn: Connection;

describe('Coach entity operations', () => {
  let coachId: number;

  // create a test Coach
  beforeAll(async () => {
    activeConn = await getTestConnection();
    const coach = new Coach();
    const savedCoach = await activeConn.manager.save(coach);
    coachId = savedCoach.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    activeConn.createQueryBuilder()
      .delete()
      .from(Coach)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a Coach', async () => {
    const actual = await activeConn.getRepository(Coach).findOne(coachId);
    expect(actual.id).toBe(coachId);
  }); // end test

}); // end describe
