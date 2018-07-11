import { graphQLFetcher } from './GraphQL';
import 'jest';

jest.mock('../../api');
import api from '../../api';

describe('GraphQL', () => {
  it('fetcher accesses /api/graphql', () => {
    api.post = jest.fn(() => {
      return Promise.resolve({ data: 'response data' });
    });
    graphQLFetcher({});
    expect(api.post).toHaveBeenCalledWith(
      '/graphql',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });

  it('fetcher returns data on success', () => {
    api.post = jest.fn(() => {
      return Promise.resolve({ data: 'response data' });
    });
    return graphQLFetcher({}).then(response => {
      expect(response).toBe('response data');
    });
  });

  it('fetcher returns data on success', () => {
    api.post = jest.fn(() => {
      return Promise.reject({ response: { data: 'error data' } });
    });
    return graphQLFetcher({}).then(response => {
      expect(response).toBe('error data');
    });
  });
});
