import { createReply } from './clients';
import api from '../api';
import bot from '../services/bot';
jest.mock('../api');
jest.mock('../services/bot');

describe('createReply', () => {
  it('calls back to the bot endpoint with client ID', async () => {
    api.post = jest.fn(() => {
      return Promise.resolve({ data: { id: 1 } });
    });
    api.put = jest.fn(() => {
      return Promise.resolve({ data: { id: 1 } });
    });
    const fakeDispatch = jest.fn();
    const fakeGetState = jest.fn(() => ({ auth: { user: { id: 2 } } }));
    await createReply(
      'Help response',
      {
        id: 1,
      },
      [{ id: 1, task_id: 2 }],
      [],
      1,
    )(fakeDispatch, fakeGetState);
    expect(bot.helpCallback).toHaveBeenCalledWith(1);
  });
});
