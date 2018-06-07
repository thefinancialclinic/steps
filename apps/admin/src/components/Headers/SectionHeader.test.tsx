import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import SectionHeader from './SectionHeader';

describe('SectionHeader.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SectionHeader label="label" />);

    expect(wrapper).toBeDefined();
  });
});
