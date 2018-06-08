import 'jest';
import { shallow } from 'enzyme';
import TopBar from './TopBar';
import React from 'react';

describe('TopBar.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TopBar />);

    expect(wrapper).toBeDefined();
  });
});
