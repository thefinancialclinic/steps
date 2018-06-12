import 'jest';
import { shallow } from 'enzyme';
import Textarea from './Textarea';
import React from 'react';

describe('Textarea.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Textarea label="label" name="name" />);

    expect(wrapper).toBeDefined();
  });
});
