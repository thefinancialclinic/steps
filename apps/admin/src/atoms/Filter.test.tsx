import Filter from './Filter';
import { shallow } from 'enzyme';
import * as React from 'react';
import 'jest';

describe('Filter.tsx', () => {
  it('renders correctly', () => {
    const categories = [
      {
        name: 'category 1',
        active: true,
      },
      {
        name: 'category 2',
        active: false,
      },
    ];
    const wrapper = shallow(<Filter categories={categories} />);

    expect(wrapper).toBeDefined();
  });
});
