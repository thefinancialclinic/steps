import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import Badge from './Badge';

describe('Badge.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Badge text="badge text" />);

    expect(wrapper).toBeDefined();
  });
});
