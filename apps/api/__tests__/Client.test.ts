import { Client } from '../src/entity/Client';
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection } from './db_helper';

let activeConn: Connection;

describe('Client entity operations', () => {
  let clientId: number;

  // create a test Client
  beforeAll(async () => {
    activeConn = await getTestConnection();
    const client = new Client();
    const savedClient = await activeConn.manager.save(client);
    clientId = savedClient.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    activeConn.createQueryBuilder()
      .delete()
      .from(Client)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a Client', async () => {
    const actual = await activeConn.getRepository(Client).findOne(clientId);
    expect(actual.id).toBe(clientId);
  }); // end test

}); // end describe
