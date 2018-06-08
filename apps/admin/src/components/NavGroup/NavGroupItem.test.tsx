import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import NavGroupItem from './NavGroupItem';

describe('NavGroupItem.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NavGroupItem link="*" />);

    expect(wrapper).toBeDefined();
  });
});
