import BackButton from './BackButton';
import { shallow } from 'enzyme';
import * as React from 'react';
import 'jest';

describe('BackButton.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<BackButton to="#">My button text</BackButton>);

    expect(wrapper).toBeDefined();
  });
});
