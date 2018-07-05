import {
  RequestRepository,
  RequestItem,
} from '../src/repository/RequestRepository';
import { fixtures, getTestConnectionPool, Pool } from './db_helper';

describe('media entity operations', () => {
  let pool: Pool;
  let request: RequestItem;
  let repo: RequestRepository;
  let creationTime: Date;

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
    creationTime = new Date();
  });

  afterAll(async () => {
    await repo.delete(request.id);
    await pool.end();
  });

  it('find a request', async () => {
    let actual = (await repo.get({ id: request.id }))[0];
    expect(actual.id).toBe(request.id);
  });

  it('gets all requests', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(x => x.id == request.id).length).toBe(1);
  });

  it('updates', async () => {
    let requestItem = (await repo.get({ id: request.id }))[0];
    requestItem.status = 'RESOLVED';
    await repo.update(requestItem);
    let reloadedItem = (await repo.get({ id: request.id }))[0];
    expect(reloadedItem.status).toBe('RESOLVED');
  });

  it('has a created_at timestamp', async () => {
    const actual: RequestItem = (await repo.get({ id: request.id }))[0];
    const t1 = actual.created_at.getTime();
    const t2 = creationTime.getTime();
    let timeDelta = Math.abs(t1 - t2);
    expect(timeDelta).toBeLessThan(500);
  });
});
