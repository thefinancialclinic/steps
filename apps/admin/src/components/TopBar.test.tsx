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
    const wrapper = shallow(<TopBar user={user} />);

    expect(wrapper).toBeDefined();
  });
});
