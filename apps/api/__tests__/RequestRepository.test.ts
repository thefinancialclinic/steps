import { RequestRepository, RequestId, Request } from '../src/repository/RequestRepository';
import { getTestConnectionPool, fixtures } from './db_helper';

describe('media entity operations', () => {
  let requestId: RequestId;
  let repo: RequestRepository;

  beforeAll(async () => {
    const pool = await getTestConnectionPool({ createFixtures: true });
    repo = new RequestRepository(pool);
    requestId = await repo.save(new Request({
      status: "NEEDS_ASSISTANCE",
      user_id: fixtures.user,
      task_id: fixtures.task,
    }));
  });

  afterAll(async () => {
    repo.delete(requestId);
  });

  it('find a request', async () => {
    let actual = await repo.getOne(requestId);
    expect(actual.id).toBe(requestId);
  });

  it('gets all requests', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(media => media.id == requestId).length).toBe(1);
  })
});
