import { BotService } from './bot';
jest.mock('axios');
import axios from 'axios';

describe('BotService', () => {
  it('calls client with user ID', () => {
    axios.create = jest.fn(config => {
      expect(config.baseURL).toBe('https://example.com');
      return {
        get: jest.fn(),
      };
    });
    const bot = new BotService('https://example.com');
    bot.helpCallback(1);
    expect(bot.client.get).toHaveBeenCalledWith('/helpresponse?user_id=1');
  });
});
