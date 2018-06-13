import {
  RequestRepository,
  RequestItem,
} from '../src/repository/RequestRepository';
import { fixtures, getTestConnectionPool, Pool } from './db_helper';

describe('media entity operations', () => {
  let pool: Pool;
  let request: RequestItem;
  let repo: RequestRepository;

  beforeAll(async () => {
    pool = await getTestConnectionPool({ createFixtures: true });
    repo = new RequestRepository(pool);
    request = await repo.save(
      new RequestItem({
        status: 'NEEDS_ASSISTANCE',
        user_id: fixtures.user.id,
        task_id: fixtures.task.id,
      }),
    );
  });

  afterAll(async () => {
    await repo.delete(request.id);
    await pool.end();
  });

  it('find a request', async () => {
    let actual = await repo.getOne(request.id);
    expect(actual.id).toBe(request.id);
  });

  it('gets all requests', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(x => x.id == request.id).length).toBe(1);
  });
});
