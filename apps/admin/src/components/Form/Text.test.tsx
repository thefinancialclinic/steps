import 'jest';
import { shallow } from 'enzyme';
import Text from './Text';
import React from 'react';

describe('Text.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Text label="label" name="name" />);

    expect(wrapper).toBeDefined();
  });
});
