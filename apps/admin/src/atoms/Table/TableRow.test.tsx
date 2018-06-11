import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import TableRow from './TableRow';

describe('TableRow.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableRow>some table content</TableRow>);

    expect(wrapper).toBeDefined();
  });
});
