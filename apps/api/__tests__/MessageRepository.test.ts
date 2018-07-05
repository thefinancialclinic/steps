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
  const expectedText = 'My Text';
  const expectedTopic = 'My Topic';

  beforeAll(async () => {
    pool = await getTestConnectionPool({ createFixtures: true });
    repo = new MessageRepository(pool);
    message = await repo.save(
      new Message({
        text: expectedText,
        to_user: fixtures.user.id,
        from_user: fixtures.user.id,
        media_id: fixtures.media.id,
        request_id: fixtures.request.id,
        timestamp: new Date(),
        topic: expectedTopic,
      }),
    );
  });

  afterAll(async () => {
    await repo.delete(message.id);
    await pool.end();
  });

  it('find a message', async () => {
    let actual = (await repo.get({ id: message.id }))[0];
    expect(actual.id).toBe(message.id);
  });

  it('gets all messages', async () => {
    let actual = await repo.getAll();
    expect(actual.find(x => x.id == message.id).text).toBe(expectedText);
  });

  it('has a topic', async () => {
    let actual = await repo.get({ id: message.id });
    expect(actual[0].topic).toBe(expectedTopic);
  });
});
