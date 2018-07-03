import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { Authenticate } from './Authenticate';

jest.mock('../../api');
import api from '../../api';

describe('Authenticate', () => {
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
        actions={{ setAuthenticatedUser: jest.fn() }}
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
        actions={{ setAuthenticatedUser: jest.fn() }}
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
        actions={{ setAuthenticatedUser: jest.fn() }}
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

  it('Sets error message on API error', async () => {
    api.get = jest.fn(() => {
      return Promise.reject('something went wrong');
    });
    const auth0 = {
      getAppToken: jest.fn(() => {
        return 'appToken';
      }),
      authenticate: jest.fn(),
    };
    const wrapper = shallow(
      <Authenticate
        actions={{ setAuthenticatedUser: jest.fn() }}
        auth0={auth0}
        api={api}
      />,
    );
    const route = wrapper.instance() as Authenticate;
    await route.onAppTokenSet();
    expect(route.state.message).toBe('something went wrong');
  });

  it('Clears tokens and redirects if auth0 auth fails', async () => {
    const auth0 = {
      getAppToken: jest.fn(() => {
        return 'appToken';
      }),
      authenticate: jest.fn(() => {
        return Promise.reject('something went wrong');
      }),
      logout: jest.fn(),
    };
    const wrapper = shallow(
      <Authenticate
        actions={{ setAuthenticatedUser: jest.fn() }}
        auth0={auth0}
        api={api}
      />,
    );
    const route = wrapper.instance() as Authenticate;
    try {
      await route.componentDidMount();
    } catch (err) {
      expect(err).toBe('something went wrong');
      expect(auth0.logout).toHaveBeenCalled();
      expect(route.state.authFinished).toBe(true);
    }
  });
});
