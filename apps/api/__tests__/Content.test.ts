import { Content } from '../src/entity/Content';
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection,
  getConnection
} from "typeorm";
import { getTestConnection } from './db_helper';

let activeConn: Connection;

describe('Content entity operations', () => {
  let contentId: number;

  // create a test Content
  beforeAll(async () => {
    activeConn = await getTestConnection();
    const content = new Content();
    const savedContent = await activeConn.manager.save(content);
    contentId = savedContent.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    activeConn.createQueryBuilder()
      .delete()
      .from(Content)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a Content', async () => {
    const actual = await activeConn.getRepository(Content).findOne(contentId);
    expect(actual.id).toBe(contentId);
  }); // end test

}); // end describe
