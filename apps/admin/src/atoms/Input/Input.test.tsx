import Input from './Input';
import { shallow } from 'enzyme';
import * as React from 'react';
import 'jest';

describe('Input.tsx', () => {
  it('renders text input', () => {
    const wrapper = shallow(<Input type="text" />);

    const input = wrapper.find('input[type="text"]');
    expect(input).toHaveLength(1);
  });
});
