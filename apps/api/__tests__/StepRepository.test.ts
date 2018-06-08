import { StepRepository, Step } from '../src/repository/StepRepository';
import { fixtures, getTestConnectionPool, Pool } from './db_helper';

describe('media entity operations', () => {
  let pool: Pool;
  let step: Step;
  let repo: StepRepository;

  beforeAll(async () => {
    pool = await getTestConnectionPool({ createFixtures: true });
    repo = new StepRepository(pool);
    step = await repo.save(
      new Step({
        text: 'TEXT',
        note: 'NOTE',
        task_id: fixtures.task.id,
      }),
    );
  });

  afterAll(async () => {
    await repo.delete(step.id);
    await pool.end();
  });

  it('find a media', async () => {
    let actual = await repo.getOne(step.id);
    expect(actual.id).toBe(step.id);
  });

  it('gets all media', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(x => x.id == step.id).length).toBe(1);
  });
});
