import { User } from '../src/entity/User';
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection, fixtures } from './db_helper';

let activeConn;

describe('User entity operations', () => {
  let userId;

  // Create 1 known user
  beforeAll(async () => {
    activeConn = await getTestConnection({ createFixtures: true });
    const newUser = new User();
    const savedUser = await activeConn.manager.save(newUser);
    userId = savedUser.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    await activeConn.createQueryBuilder()
      .delete()
      .from(User)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a user', async () => {
    const actual = await activeConn.getRepository(User).findOne(userId);
    expect(actual.id).toBe(userId);
  }); // end test

  it('create a user', async () => {
    const newUser = new User();
    const expected = await activeConn.manager.save(newUser);
    const actual = await activeConn.manager.findOne(User, expected.id);

    expect(actual).toEqual(expected);
  }); // end test
}); // end describe
