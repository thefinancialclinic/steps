import Input from './Input';
import { shallow } from 'enzyme';
import * as React from 'react';
import 'jest';
import { Field } from 'react-final-form';

describe('Input.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Input type="text" name="my input" />);

    expect(wrapper).toBeDefined();
  });
});
