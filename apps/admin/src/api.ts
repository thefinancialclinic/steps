import axios from 'axios';

const client = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001/api',
});

export default client;
