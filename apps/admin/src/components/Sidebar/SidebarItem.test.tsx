import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import SidebarItem from './SidebarItem';

describe('SidebarItem.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SidebarItem to="*" />);

    expect(wrapper).toBeDefined();
  });
});
