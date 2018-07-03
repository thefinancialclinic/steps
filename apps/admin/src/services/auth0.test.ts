import 'jest';
import { Auth0Service } from './auth0';

let auth0, redirectURL;

describe('auth0 service', () => {
  beforeEach(() => {
    auth0 = new Auth0Service({
      login: jest.fn(),
      signup: jest.fn(),
      parseHash: jest.fn(),
      passwordlessStart: jest.fn(),
    });
    localStorage.clear();
  });

  describe('magicLink', () => {
    it('calls auth0 with email', done => {
      auth0.magicLinkRedirectUri = 'https://example.com/magic-link';
      auth0.webAuth.passwordlessStart = (opts, _cb) => {
        expect(opts.email).toBe('fake@example.com');
        expect(opts.send).toBe('link');
        expect(opts.connection).toBe('email');
        expect(opts.redirectUri).toBe('https://example.com/magic-link');
        expect(opts.authParams).toEqual({
          state: 'state',
          nonce: 'nonce',
        });
        done();
      };
      auth0.magicLink('fake@example.com');
    });

    it('rejects promise with error on error', () => {
      auth0.webAuth.passwordlessStart = (_opts, cb) => {
        cb({ message: 'error' });
      };
      return auth0.magicLink('fake@example.com').catch(err => {
        expect(err.message).toBe('Something went wrong.');
      });
    });
  });

  describe('login', () => {
    it('calls auth0 with email and password', done => {
      auth0.webAuth.login = (opts, _cb) => {
        expect(opts.email).toBe('fake@example.com');
        expect(opts.password).toBe('hunter2');
        done();
      };
      auth0.login('fake@example.com', 'hunter2');
    });

    it('rejects promise with error on error', () => {
      auth0.webAuth.login = (_opts, cb) => {
        cb({ message: 'error' });
      };
      return auth0.login('fake@example.com', 'hunter2').catch(err => {
        expect(err.message).toBe('Something went wrong.');
      });
    });
  });

  describe('signup', () => {
    it('calls auth0 with email, password, connection', done => {
      auth0.webAuth.signup = (opts, _cb) => {
        expect(opts.email).toBe('fake@example.com');
        expect(opts.password).toBe('hunter2');
        expect(opts.connection).toBe('Username-Password-Authentication');
        done();
      };
      auth0.signup('fake@example.com', 'hunter2');
    });

    it('rejects promise with error on error', () => {
      auth0.webAuth.signup = (_opts, cb) => {
        cb({ message: 'error' });
      };
      return auth0.signup('fake@example.com', 'hunter2').catch(err => {
        expect(err.message).toBe('Something went wrong.');
      });
    });
  });

  describe('signupAndLogin', () => {
    it('calls auth0 with email, password, connection', done => {
      auth0.webAuth.signup = (opts, _cb) => {
        expect(opts.email).toBe('fake@example.com');
        expect(opts.password).toBe('hunter2');
        expect(opts.connection).toBe('Username-Password-Authentication');
        done();
      };
      auth0.signupAndLogin('fake@example.com', 'hunter2');
    });

    it('rejects promise with error on error', () => {
      auth0.webAuth.signup = (_opts, cb) => {
        cb({ message: 'error' });
      };
      return auth0.signupAndLogin('fake@example.com', 'hunter2').catch(err => {
        expect(err.message).toBe('Something went wrong.');
      });
    });

    it('calls login after signup', done => {
      auth0.webAuth.login = (opts, _cb) => {
        expect(opts.email).toBe('fake@example.com');
        expect(opts.password).toBe('hunter2');
        done();
      };
      auth0.webAuth.signup = (_opts, cb) => {
        cb(null, { email: 'fake@example.com' });
      };
      auth0.signupAndLogin('fake@example.com', 'hunter2');
    });
  });

  describe('logout', () => {
    it('removes token data from localStorage', () => {
      localStorage.setItem('access_token', 'token');
      localStorage.setItem('id_token', 'token');
      localStorage.setItem('expires_at', 'date');

      auth0.logout();

      expect(localStorage.getItem('access_token')).toBe(null);
      expect(localStorage.getItem('id_token')).toBe(null);
      expect(localStorage.getItem('expires_at')).toBe(null);
    });
  });

  describe('setAuthTokens', () => {
    xit('sets expiration date', () => {
      auth0.setAuthTokens({
        accessToken: 'accessToken',
        idToken: 'idToken',
        expiresIn: 2,
      });

      expect(localStorage.getItem('expires_at')).toBe('1529693864006');
    });

    it('sets access token', () => {
      auth0.setAuthTokens({
        accessToken: 'accessToken',
        idToken: 'idToken',
        expiresIn: 2,
      });

      expect(localStorage.getItem('access_token')).toBe('accessToken');
    });

    it('sets id token', () => {
      auth0.setAuthTokens({
        accessToken: 'accessToken',
        idToken: 'idToken',
        expiresIn: 2,
      });

      expect(localStorage.getItem('id_token')).toBe('idToken');
    });
  });

  describe('authenticate', () => {
    it('skips parsing hash if current session tokens are found', () => {
      localStorage.setItem(
        'expires_at',
        JSON.stringify(new Date().getTime() * 100),
      );
      auth0.webAuth.parseHash = jest.fn();
      expect(auth0.webAuth.parseHash).not.toBeCalled();
    });

    it('sets tokens when it resolves', () => {
      auth0.webAuth.parseHash = callback => {
        callback(null, {
          accessToken: 'accessToken',
          idToken: 'idToken',
          expiresIn: 2,
        });
      };
      return auth0.authenticate().then(() => {
        expect(localStorage.getItem('access_token')).toBe('accessToken');
        expect(localStorage.getItem('id_token')).toBe('idToken');
      });
    });

    it('rejects with an error on webAuth error', () => {
      auth0.webAuth.parseHash = callback => {
        callback('some error');
      };
      return auth0.authenticate().catch(err => {
        expect(err).toBe('some error');
      });
    });
  });

  describe('getAppToken', () => {
    it('gets access token from localStorage', () => {
      localStorage.setItem('access_token', 'accessToken');
      expect(auth0.getAppToken()).toBe('accessToken');
    });
  });

  describe('getIdToken', () => {
    it('gets id token from localStorage', () => {
      localStorage.setItem('id_token', 'idToken');
      expect(auth0.getIdToken()).toBe('idToken');
    });
  });

  describe('hasCurrentSessionToken', () => {
    it('returns true when token is current', () => {
      localStorage.setItem(
        'expires_at',
        JSON.stringify(new Date().getTime() * 100),
      );
      expect(auth0.hasCurrentSessionToken()).toBe(true);
    });

    it('returns false when token is expired', () => {
      localStorage.setItem(
        'expires_at',
        JSON.stringify(new Date().getTime() - 100),
      );
      expect(auth0.hasCurrentSessionToken()).toBe(false);
    });
  });
});
