import { MediaRepository, MediaId, Media } from '../src/repository/MediaRepository';
import { fixtures, getTestConnectionPool } from './db_helper';

describe('media entity operations', () => {
  let mediaId: MediaId;
  let repo: MediaRepository;

  beforeAll(async () => {
    const pool = await getTestConnectionPool({ createFixtures: true });
    repo = new MediaRepository(pool);
    mediaId = await repo.save(new Media({
      step_id: fixtures.step,
      task_id: fixtures.task,
      title: 'TITLE',
      category: 'CATEGORY',
      description: 'DESCRIPTION',
      url: 'URL',
      image: 'IMAGE',
      published_by: fixtures.org,
      type: 'GENERAL_EDUCATION'
    }));
  });

  afterAll(async () => {
    repo.delete(mediaId);
  });

  it('find a media', async () => {
    let actual = await repo.getOne(mediaId);
    expect(actual.id).toBe(mediaId);
  });

  it('gets all media', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(media => media.id == mediaId).length).toBe(1);
  })
});
