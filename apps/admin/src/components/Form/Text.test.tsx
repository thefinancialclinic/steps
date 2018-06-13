import 'jest';
import { shallow } from 'enzyme';
import Text from './Text';
import React from 'react';
import { Field } from 'react-final-form';

describe('Text.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Text label="label" name="name" />);

    expect(wrapper).toBeDefined();
  });

  it('is a text component', () => {
    const wrapper = shallow(<Text label="label" name="name" />);

    const field = wrapper.find(Field);

    expect(field.props().component).toEqual('input');
  });
});
