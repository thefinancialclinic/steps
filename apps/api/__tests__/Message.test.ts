import { Message } from '../src/entity/Message';
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection } from './db_helper';

let activeConn: Connection;

describe('Message entity operations', () => {
  let messageId: number;

  // create a test Message
  beforeAll(async () => {
    activeConn = await getTestConnection();
    const message = new Message();
    const savedMessage = await activeConn.manager.save(message);
    messageId = savedMessage.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    activeConn.createQueryBuilder()
      .delete()
      .from(Message)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a Message', async () => {
    const actual = await activeConn.getRepository(Message).findOne(messageId);
    expect(actual.id).toBe(messageId);
  }); // end test

}); // end describe
