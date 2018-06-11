import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import TableCell from './TableCell';

describe('TableCell.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableCell>some table content</TableCell>);

    expect(wrapper).toBeDefined();
  });
});
