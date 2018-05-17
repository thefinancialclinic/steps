import { Org } from '../src/entity/Org';
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection } from './db_helper';

let activeConn: Connection;

describe('Org entity operations', () => {
  let orgId: number;

  // create a test Org
  beforeAll(async () => {
    activeConn = await getTestConnection({ createFixtures: true });
    const org = new Org();
    org.botPhone = '1-800-555-2368'
    org.name = 'ORG NAME'
    const savedOrg = await activeConn.manager.save(org);
    orgId = savedOrg.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    activeConn.createQueryBuilder()
      .delete()
      .from(Org)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a Org', async () => {
    const actual = await activeConn.getRepository(Org).findOne(orgId);
    expect(actual.id).toBe(orgId);
  }); // end test

}); // end describe
