import { OrgRepository, Org } from '../src/repository/OrgRepository';
import { getTestConnectionPool, Pool } from './db_helper';

describe('Org entity operations', () => {
  let pool: Pool;
  let org: Org;
  let repo: OrgRepository;

  beforeAll(async () => {
    const pool = await getTestConnectionPool({ createFixtures: true });
    repo = new OrgRepository(pool);
    org = await repo.save(
      new Org({
        name: 'My Org',
        sms_number: '555-1234',
        logo: 'http://www.example.com/LOGO.jpg',
      }),
    );
  });

  afterAll(async () => {
    await repo.delete(org.id);
    pool.end();
  });

  it('find an org', async () => {
    let actual = await repo.getOne(org.id);
    expect(actual.id).toBe(org.id);
  });

  it('gets all orgs', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(x => x.id == org.id).length).toBe(1);
  });
});
