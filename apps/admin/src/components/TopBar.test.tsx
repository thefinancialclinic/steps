import 'jest';
import { shallow } from 'enzyme';
import TopBar from './TopBar';
import React from 'react';

describe('TopBar.tsx', () => {
  it('renders correctly', () => {
    const user = {
      org: { name: 'hello' },
      first_name: 'bob',
      last_name: 'villa',
    };

    const org = {
      name: 'Steps',
    };
    const wrapper = shallow(<TopBar user={user} org={org} />);

    expect(wrapper).toBeDefined();
  });
});
