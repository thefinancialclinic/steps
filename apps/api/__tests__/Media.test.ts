import { Media } from "../src/entity/Media";
import {
  createConnection,
  getConnectionManager,
  getManager,
  ConnectionManager,
  Connection
} from "typeorm";
import { getTestConnection, fixtures } from "./db_helper";

let activeConn: Connection;

describe("Media entity operations", () => {
  let mediaId: number;

  // Create 1 known media
  beforeAll(async () => {
    activeConn = await getTestConnection({ createFixtures: true });
    const media = new Media();
    media.title = "TITLE";
    media.category = "CATEGORY";
    media.description = "DESCRIPTION";
    media.url = "URL";
    media.type = "TASK_CONTENT"; // or TASK_RESOURCE, STORY, GENERAL_EDUCATION
    media.responses = [{ "1": "YOU PICKED 1!" }];
    media.task = fixtures.task;
    media.step = fixtures.step;
    media.publishedBy = fixtures.org;
    const savedMedia = await activeConn.manager.save(media);
    mediaId = savedMedia.id;
  }); // end beforeAll

  // Clean up any test data from table
  afterAll(async () => {
    await activeConn
      .createQueryBuilder()
      .delete()
      .from(Media)
      .where("true")
      .execute();
  }); // end afterAll

  it("find media", async () => {
    const actual = await activeConn.getRepository(Media).findOne(mediaId);
    expect(actual.id).toBe(mediaId);
  }); // end test
}); // end describe
