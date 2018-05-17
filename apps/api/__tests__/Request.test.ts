import { Request } from "../src/entity/Request";
import { Connection } from "typeorm";
import { getTestConnection, fixtures } from "./db_helper";

let activeConn: Connection;

describe("Request entity operations", () => {
  let requestId: number;

  // Create 1 known request
  beforeAll(async () => {
    activeConn = await getTestConnection({ createFixtures: true });
    const request = new Request();
    request.status = "NEEDS_ASSISTANCE";
    const savedRequest = await activeConn.manager.save(request);
    requestId = savedRequest.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    await activeConn
      .createQueryBuilder()
      .delete()
      .from(Request)
      .where("true")
      .execute();
  }); // end afterAll

  it("find a Request", async () => {
    const actual = await activeConn.getRepository(Request).findOne(requestId);
    expect(actual.id).toBe(requestId);
  }); // end test
}); // end describe
