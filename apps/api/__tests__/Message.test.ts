import { Message } from "../src/entity/Message";
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection, fixtures } from "./db_helper";
import { Coach } from "../src/entity/Coach";
import { Org } from "../src/entity/Org";
import { Client } from "../src/entity/Client";

let activeConn: Connection;

describe("Message entity operations", () => {
  let messageId: number;

  // create a test Message
  beforeAll(async () => {
    try {
      activeConn = await getTestConnection({ createFixtures: true });

      // create Message w/ relations
      const message = new Message();
      message.coach = fixtures.coach;
      message.org = fixtures.org;
      message.client = fixtures.client;
      message.request = fixtures.request;
      const savedMessage = await activeConn.manager.save(message);
      messageId = savedMessage.id;
    } catch (error) {
      console.log(error);
    }
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    activeConn
      .createQueryBuilder()
      .delete()
      .from(Message)
      .where("true")
      .execute();
  }); // end afterAll

  it("find a Message", async () => {
    const actual = await activeConn.getRepository(Message).findOne(messageId);
    expect(actual.id).toBe(messageId);
  }); // end test
}); // end describe
