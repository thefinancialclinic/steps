import {
  MessageRepository,
  Message,
} from '../src/repository/MessageRepository';
import { fixtures, getTestConnectionPool, Pool } from './db_helper';

let activeConn;

describe('Message entity operations', () => {
  let pool: Pool;
  let message: Message;
  let repo: MessageRepository;

  beforeAll(async () => {
    pool = await getTestConnectionPool({ createFixtures: true });
    repo = new MessageRepository(pool);
    message = await repo.save(
      new Message({
        text: 'My Text',
        to_user: fixtures.user.id,
        from_user: fixtures.user.id,
        media_id: fixtures.media.id,
        request_id: fixtures.request.id,
        timestamp: new Date(),
      }),
    );
  });

  afterAll(async () => {
    await repo.delete(message.id);
    await pool.end();
  });

  it('find a message', async () => {
    let actual = await repo.getOne(message.id);
    expect(actual.id).toBe(message.id);
  });

  it('gets all messages', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(x => x.id == message.id).length).toBe(1);
    expect(actual[0].text).toBe('My Text');
  });
});
