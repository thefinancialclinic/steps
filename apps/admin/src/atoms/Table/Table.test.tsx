import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import Table from './Table';

describe('Table.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Table>some table content</Table>);

    expect(wrapper).toBeDefined();
  });
});
