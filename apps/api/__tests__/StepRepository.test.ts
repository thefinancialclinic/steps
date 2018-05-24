import { StepRepository, StepId, Step } from '../src/repository/StepRepository';
import { getTestConnectionPool, fixtures } from './db_helper';

describe('media entity operations', () => {
  let stepId: StepId;
  let repo: StepRepository;

  beforeAll(async () => {
    const pool = await getTestConnectionPool({ createFixtures: true });
    repo = new StepRepository(pool);
    stepId = await repo.save(new Step({
      text: "TEXT",
      note: "NOTE",
      task_id: fixtures.task,
    }));
  });

  afterAll(async () => {
    repo.delete(stepId);
  });

  it('find a media', async () => {
    let actual = await repo.getOne(stepId);
    expect(actual.id).toBe(stepId);
  });

  it('gets all media', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(media => media.id == stepId).length).toBe(1);
  })
});
