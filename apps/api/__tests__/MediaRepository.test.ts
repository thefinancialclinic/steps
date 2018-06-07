import { MediaRepository, Media } from '../src/repository/MediaRepository';
import { fixtures, getTestConnectionPool } from './db_helper';

describe('media entity operations', () => {
  let media: Media;
  let repo: MediaRepository;

  beforeAll(async () => {
    const pool = await getTestConnectionPool({ createFixtures: true });
    repo = new MediaRepository(pool);
    media = await repo.save(
      new Media({
        step_id: fixtures.step.id,
        task_id: fixtures.task.id,
        title: 'TITLE',
        category: 'CATEGORY',
        description: 'DESCRIPTION',
        url: 'URL',
        image: 'IMAGE',
        published_by: fixtures.org.id,
        type: 'GENERAL_EDUCATION',
      }),
    );
  });

  afterAll(async () => {
    repo.delete(media.id);
  });

  it('find a media', async () => {
    let actual = await repo.getOne(media.id);
    expect(actual.id).toBe(media.id);
  });

  it('gets all media', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(x => x.id == media.id).length).toBe(1);
  });
});
