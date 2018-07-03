import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { MagicLinkAuth } from './MagicLinkAuth';
import Authenticate from './Authenticate';

describe('MagicLinkAuth', () => {
  it('Sets nonce and state in localStorage as Auth0 workaround', async () => {
    const wrapper = shallow(<MagicLinkAuth />);
    const route = wrapper.instance() as MagicLinkAuth;
    route.componentWillMount();
    expect(window.localStorage.getItem('com.auth0.auth.state')).toEqual(
      JSON.stringify({
        nonce: 'nonce',
        state: 'state',
      }),
    );
  });

  it('Redirects to /my-tasks on failure', async () => {
    const wrapper = shallow(<MagicLinkAuth />);
    expect(wrapper.find(Authenticate).props().redirect).toEqual('/my-tasks');
  });
});
