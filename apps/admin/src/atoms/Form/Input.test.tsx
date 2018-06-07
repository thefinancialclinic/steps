import Input from './Input';
import { shallow } from 'enzyme';
import * as React from 'react';
import 'jest';

describe('Input.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Input type="text" />);

    expect(wrapper).toBeDefined();
  });
});
