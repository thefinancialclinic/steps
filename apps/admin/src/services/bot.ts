import axios, { AxiosInstance } from 'axios';

export class BotService {
  botURL: string;
  client: AxiosInstance;

  constructor(botURL?: string, client?: AxiosInstance) {
    this.botURL = botURL || process.env.BOT_URL;
    this.client =
      client ||
      axios.create({
        baseURL: this.botURL,
      });
  }

  async helpCallback(userId: number) {
    return this.client.get(`/helpresponse?user_id=${userId}`);
  }
}

export default new BotService();
