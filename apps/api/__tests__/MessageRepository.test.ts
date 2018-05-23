import { MessageRepository, MessageId, Message } from '../src/repository/MessageRepository';
import { getTestConnectionPool, fixtures } from './db_helper';

let activeConn;

describe('Message entity operations', () => {
  let messageId: MessageId;
  let repo: MessageRepository;

  beforeAll(async () => {
    const pool = await getTestConnectionPool({ createFixtures: true })
    repo = new MessageRepository(pool);
    messageId = await repo.save(new Message({
      text: 'My Text',
      to_user: fixtures.user,
      from_user: fixtures.user,
      media_id: fixtures.media,
      request_id: fixtures.request,
      timestamp: new Date()
    }));
  });

  afterAll(async () => {
    repo.delete(messageId);
  });

  it('find a message', async () => {
    let actual = await repo.getOne(messageId);
    expect(actual.id).toBe(messageId);
  });

  it('gets all messages', async () => {
    let actual = await repo.getAll();
    expect(actual.filter(message => message.id == messageId).length).toBe(1);
    expect(actual[0].text).toBe('My Text');
  })
});
