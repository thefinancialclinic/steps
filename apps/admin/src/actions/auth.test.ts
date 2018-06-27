import 'jest';
import { signup, getAuthenticatedUser, setUnauthenticatedUser } from './auth';
import { USER_TYPE } from '../reducers/auth';
jest.mock('../services/auth0');
jest.mock('../api');
import auth0 from '../services/auth0';
import api from '../api';

describe('Auth actions', () => {
  beforeEach(() => {
    auth0.signup = jest.fn(() => {
      return Promise.resolve({ id: 'auth0-id' });
    });
    api.get = jest.fn(() => {
      return Promise.resolve({ data: { id: 1 } });
    });
    api.post = jest.fn(() => {
      return Promise.resolve({ data: { id: { id: 1 } } });
    });
  });

  describe('signup', () => {
    it('awaits the auth0 user response', async () => {
      await signup(USER_TYPE.COACH, {
        email: 'fake@example.com',
        password: 'hunter2',
      })();
    });

    it('removes password from other user attributes', async () => {
      await signup(USER_TYPE.COACH, {
        email: 'fake@example.com',
        password: 'hunter2',
      })();
      const post = api.post as jest.Mock;
      const mockPost = post.mock;
      expect(mockPost.calls[0][1]).not.toContain('password');
    });

    it('adds user type to attributes', async () => {
      await signup(USER_TYPE.COACH, {
        email: 'fake@example.com',
        password: 'hunter2',
      })();
      const post = api.post as jest.Mock;
      const mockPost = post.mock;
      expect(mockPost.calls[0][1].type).toBe('Coach');
    });

    it('adds required attributes to user attributes', async () => {
      await signup(USER_TYPE.COACH, {
        email: 'fake@example.com',
        password: 'hunter2',
      })();
      const post = api.post as jest.Mock;
      const mockPost = post.mock;
      const userAttrs = mockPost.calls[0][1];
      expect(userAttrs.goals).toEqual([]);
      expect(userAttrs.status).toBe('WORKING');
    });

    it('POSTs to create a new (domain) user', async () => {
      await signup(USER_TYPE.COACH, {
        email: 'fake@example.com',
        password: 'hunter2',
      })();
      const post = api.post as jest.Mock;
      const mockPost = post.mock;
      const endpoint = mockPost.calls[0][0];
      expect(endpoint).toBe('/users');
    });

    it('creates org for admin users', async () => {
      await signup(USER_TYPE.ADMIN, {
        email: 'fake@example.com',
        password: 'hunter2',
        organization_name: 'organization',
      })();
      const post = api.post as jest.Mock;
      const mockPost = post.mock;
      const [endpoint, attrs] = mockPost.calls[0];
      expect(endpoint).toBe('/orgs');
      expect(attrs.name).toBe('organization');
    });

    it('adds org ID to admin user attrs', async () => {
      await signup(USER_TYPE.ADMIN, {
        email: 'fake@example.com',
        password: 'hunter2',
        organization_name: 'organization',
      })();
      const post = api.post as jest.Mock;
      const mockPost = post.mock;
      const [endpoint, attrs] = mockPost.calls[1];
      expect(endpoint).toBe('/users');
      expect(attrs.org_id).toBe(1);
    });

    it('logs in to auth0 after auth0 signup and domain user creation', async () => {
      await signup(USER_TYPE.COACH, {
        email: 'fake@example.com',
        password: 'hunter2',
        organization_name: 'organization',
      })();
      expect(auth0.login).toHaveBeenCalledWith('fake@example.com', 'hunter2');
    });
  });

  describe('load authenticated user', () => {
    it('GETs /user if user has current session token', async () => {
      auth0.hasCurrentSessionToken = jest.fn(() => true);
      await getAuthenticatedUser()(jest.fn());
      expect(api.get).toHaveBeenCalledWith('/user');
    });

    it('adds token to Authorization header if user has current session token', async () => {
      auth0.hasCurrentSessionToken = jest.fn(() => true);
      auth0.getAppToken = jest.fn(() => 'appToken');
      await getAuthenticatedUser()(jest.fn());
      expect(api.defaults.headers.common['Authorization']).toBe(
        'Bearer appToken',
      );
    });
  });
});
