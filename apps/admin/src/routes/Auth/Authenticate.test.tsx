import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { Authenticate } from './Authenticate';
import { AlertLevel } from '../../components/Alert/types';

jest.mock('../../api');
import api from '../../api';

let log;

describe('Authenticate', () => {
  beforeEach(() => {
    log = console.log;
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = log;
  });

  it('Adds app token to bearer header', async () => {
    api.get = jest.fn(() => {
      return Promise.resolve({ data: { id: 1 } });
    });
    const auth0 = {
      getAppToken: jest.fn(() => {
        return 'appToken';
      }),
      authenticate: jest.fn(),
    };
    const wrapper = shallow(
      <Authenticate
        actions={{ setAuthenticatedUser: jest.fn(), addAlert: jest.fn() }}
        auth0={auth0}
        api={api}
      />,
    );
    const route = wrapper.instance() as Authenticate;
    await route.onAppTokenSet();
    expect(api.defaults.headers.common['Authorization']).toBe(
      'Bearer appToken',
    );
  });

  it('Gets user from the auth endpoint', async () => {
    api.get = jest.fn(() => {
      return Promise.resolve({ data: { id: 1 } });
    });
    const auth0 = {
      getAppToken: jest.fn(() => {
        return 'appToken';
      }),
      authenticate: jest.fn(),
    };
    const wrapper = shallow(
      <Authenticate
        actions={{ setAuthenticatedUser: jest.fn(), addAlert: jest.fn() }}
        auth0={auth0}
        api={api}
      />,
    );
    const route = wrapper.instance() as Authenticate;
    await route.onAppTokenSet();
    expect(api.get).toHaveBeenCalledWith('/user');
  });

  it('Calls setAuthenticatedUser with user data', async () => {
    api.get = jest.fn(() => {
      return Promise.resolve({ data: { id: 1 } });
    });
    const auth0 = {
      getAppToken: jest.fn(() => {
        return 'appToken';
      }),
      authenticate: jest.fn(),
    };
    const wrapper = shallow(
      <Authenticate
        actions={{ setAuthenticatedUser: jest.fn(), addAlert: jest.fn() }}
        auth0={auth0}
        api={api}
      />,
    );
    const route = wrapper.instance() as Authenticate;
    await route.onAppTokenSet();
    expect(route.props.actions.setAuthenticatedUser).toHaveBeenCalledWith({
      id: 1,
    });
  });

  it('Clears tokens and redirects on API error', async () => {
    const err = { response: { status: 401 } };
    api.get = jest.fn(() => {
      return Promise.reject(err);
    });
    const auth0 = {
      getAppToken: jest.fn(() => {
        return 'appToken';
      }),
      authenticate: jest.fn(),
      logout: jest.fn(),
    };
    const actions = { setAuthenticatedUser: jest.fn(), addAlert: jest.fn() };
    const wrapper = shallow(
      <Authenticate actions={actions} auth0={auth0} api={api} />,
    );
    const route = wrapper.instance() as Authenticate;

    await route.onAppTokenSet();
    expect(route.state.authFinished).toBe(true);
    expect(actions.addAlert).toHaveBeenCalledWith({
      id: 'auth-error',
      level: AlertLevel.Error,
      message: 'Something went wrong.',
    });
    expect(auth0.logout).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(err);
  });

  it('Sets a helpful alert message if user is not found', async () => {
    const err = { response: { status: 404 } };
    api.get = jest.fn(() => {
      return Promise.reject(err);
    });
    const auth0 = {
      getAppToken: jest.fn(() => {
        return 'appToken';
      }),
      authenticate: jest.fn(),
      logout: jest.fn(),
    };
    const actions = { setAuthenticatedUser: jest.fn(), addAlert: jest.fn() };
    const wrapper = shallow(
      <Authenticate actions={actions} auth0={auth0} api={api} />,
    );
    const route = wrapper.instance() as Authenticate;
    await route.onAppTokenSet();
    expect(route.state.authFinished).toBe(true);
    expect(actions.addAlert).toHaveBeenCalledWith({
      id: 'auth-error',
      level: AlertLevel.Error,
      message: "We can't find a user with your email address.",
    });
    expect(auth0.logout).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(err);
  });

  it('Clears tokens and redirects if auth0 auth fails', async () => {
    const err = 'something went wrong';
    const auth0 = {
      getAppToken: jest.fn(() => {
        return 'appToken';
      }),
      authenticate: jest.fn(() => {
        return Promise.reject(err);
      }),
      logout: jest.fn(),
    };
    const actions = { setAuthenticatedUser: jest.fn(), addAlert: jest.fn() };
    const wrapper = shallow(
      <Authenticate actions={actions} auth0={auth0} api={api} />,
    );
    const route = wrapper.instance() as Authenticate;
    await route.componentDidMount();
    expect(route.state.authFinished).toBe(true);
    expect(actions.addAlert).toHaveBeenCalledWith({
      id: 'auth-error',
      level: AlertLevel.Error,
      message: 'Something went wrong.',
    });
    expect(auth0.logout).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith(err);
  });
});
