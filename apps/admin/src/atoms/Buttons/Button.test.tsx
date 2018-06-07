import Button from './Button';
import { shallow } from 'enzyme';
import * as React from 'react';
import 'jest';

describe('Button.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Button>My button text</Button>);

    expect(wrapper).toBeDefined();
  });
});
