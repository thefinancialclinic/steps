import { Admin } from '../src/entity/Admin';
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection, fixtures } from './db_helper';

let activeConn: Connection;

describe('Admin entity operations', async () => {
  let adminId: number;

  // create a test Admin
  beforeAll(async () => {
    activeConn = await getTestConnection({ createFixtures: true });
    const admin = new Admin();
    admin.org = fixtures.org;
    const savedAdmin = await activeConn.manager.save(admin);
    adminId = savedAdmin.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    activeConn.createQueryBuilder()
      .delete()
      .from(Admin)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a Admin', async () => {
    const actual = await activeConn.getRepository(Admin).findOne(adminId);
    expect(actual.id).toBe(adminId);
  }); // end test

}); // end describe
