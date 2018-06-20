import Auth0, { Auth0DecodedHash } from 'auth0-js';

export const auth0 = new Auth0.WebAuth({
  domain: 'steps.auth0.com',
  clientID: 'R4uBotWz7sHgmvfmlsBI3othCDEpo4Ga',
  redirectUri: 'http://localhost:3000/authenticate',
  audience: 'http://steps-admin.herokuapp.com',
  responseType: 'token id_token',
  scope: 'openid email',
});

export const login = () => {
  auth0.authorize();
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
};

export const setSessionToken = (authResult: Auth0DecodedHash) => {
  let expiresAt = JSON.stringify(
    authResult.expiresIn * 1000 + new Date().getTime(),
  );
  localStorage.setItem('access_token', authResult.accessToken);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('expires_at', expiresAt);
};

export const authenticate = (onSessionTokenSet: Function) => {
  auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      setSessionToken(authResult);
      onSessionTokenSet();
    } else if (err) {
      console.log(err);
    }
  });
};

export const hasCurrentSessionToken = () => {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date().getTime() < expiresAt;
};

export default {
  login: login,
  logout: logout,
  setSessionToken: setSessionToken,
  authenticate: authenticate,
  hasCurrentSessionToken: hasCurrentSessionToken,
};
