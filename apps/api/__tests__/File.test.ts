import { File } from '../src/entity/File';
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection, fixtures } from './db_helper';

let activeConn: Connection;

describe('File entity operations', () => {
  let fileId: number;

  // create a test File
  beforeAll(async () => {
    activeConn = await getTestConnection({ createFixtures: true });
    const file = new File();
    file.org = fixtures.org;
    const savedFile = await activeConn.manager.save(file);
    fileId = savedFile.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    activeConn.createQueryBuilder()
      .delete()
      .from(File)
      .where('true')
      .execute();
  }); // end afterAll

  it('find a File', async () => {
    const actual = await activeConn.getRepository(File).findOne(fileId);
    expect(actual.id).toBe(fileId);
  }); // end test

}); // end describe
