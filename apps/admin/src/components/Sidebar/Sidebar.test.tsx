import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import Sidebar from './Sidebar';

describe('Sidebar.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Sidebar links={[]} />);

    expect(wrapper).toBeDefined();
  });
});
