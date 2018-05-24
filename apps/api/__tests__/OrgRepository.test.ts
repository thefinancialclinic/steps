import { OrgRepository, OrgId, Org } from "../src/repository/OrgRepository";
import { getTestConnectionPool } from "./db_helper";

describe("Org entity operations", () => {
  let orgId: OrgId;
  let repo: OrgRepository;

  beforeAll(async () => {
    const pool = await getTestConnectionPool({ createFixtures: true });
    repo = new OrgRepository(pool);
    orgId = await repo.save(new Org({
      name: "My Org",
      sms_number: "555-1234",
      logo: "http://www.example.com/LOGO.jpg",
    }));
  });

  afterAll(async () => {
    repo.delete(orgId);
  });

  it("find an org", async () => {
    let actual = await repo.getOne(orgId);
    expect(actual.id).toBe(orgId);
  });

  it("gets all orgs", async () => {
    let actual = await repo.getAll();
    expect(actual.filter(org => org.id == orgId).length).toBe(1);
  });
});
