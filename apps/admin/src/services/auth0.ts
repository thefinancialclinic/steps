import Auth0, { Auth0DecodedHash } from 'auth0-js';

interface Auth0Client {
  login: any;
  signup: any;
  parseHash: any;
  passwordlessStart: any;
}

interface Auth0SignupResponse {
  Id: string;
}

export class Auth0Service {
  webAuth: Auth0Client;
  magicLinkRedirectUri: string;

  constructor(webAuth?: Auth0Client) {
    this.webAuth =
      webAuth ||
      new Auth0.WebAuth({
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        redirectUri: process.env.AUTH0_REDIRECT_URL,
        audience: process.env.AUTH0_AUDIENCE,
        responseType: 'token id_token',
        scope: 'openid',
      });
      this.magicLinkRedirectUri = process.env.AUTH0_MAGIC_LINK_REDIRECT_URL;
  }

  magicLink(email) {
    return new Promise((resolve, reject) => {
      this.webAuth.passwordlessStart(
        {
          email: email,
          send: 'link',
          connection: 'email',
          redirectUri: this.magicLinkRedirectUri,
          authParams: {
            state: 'state',
            nonce: 'nonce',
          },
        },
        err => {
          if (err) {
            const { description } = err;
            reject({ message: description || 'Something went wrong.' });
          } else {
            resolve();
          }
        },
      );
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      this.webAuth.login({ email: email, password: password }, err => {
        if (err) {
          const { description } = err;
          reject({ message: description || 'Something went wrong.' });
        } else {
          resolve();
        }
      });
    });
  }

  signupAndLogin(email, password) {
    return this.signup(email, password).then(_res => {
      return this.login(email, password);
    });
  }

  signup(email, password): Promise<Auth0SignupResponse> {
    return new Promise((resolve, reject) => {
      this.webAuth.signup(
        {
          email: email,
          password: password,
          connection: 'Username-Password-Authentication',
        },
        (err, res) => {
          if (err) {
            let message = 'Something went wrong.';
            switch (err.code) {
              case 'invalid_password':
                message =
                  'Your password is invalid. Make sure it contains a letter, number, and special character.';
                break;
              case 'invalid email address':
                message = 'Your email address is invalid.';
                break;
              case 'user_exists':
                message = 'Someone has already signed up with your email.';
                break;
            }
            reject({ message: message });
          } else {
            resolve(res);
          }
        },
      );
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  setAuthTokens(authResult: Auth0DecodedHash) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  authenticate() {
    if (!this.hasCurrentSessionToken()) {
      return new Promise((resolve, reject) => {
        this.webAuth.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setAuthTokens(authResult);
            resolve();
          } else if (err) {
            reject(err);
          }
        });
      });
    }
  }

  getAppToken() {
    return localStorage.getItem('access_token');
  }

  getIdToken() {
    return localStorage.getItem('id_token');
  }

  hasCurrentSessionToken() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

export default new Auth0Service();
