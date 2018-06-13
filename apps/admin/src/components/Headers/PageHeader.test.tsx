import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import PageHeader from './PageHeader';

describe('PageHeader.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<PageHeader label="label" />);

    expect(wrapper).toBeDefined();
  });
});
