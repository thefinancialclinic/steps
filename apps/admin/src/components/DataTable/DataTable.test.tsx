import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import DataTable from './DataTable';

describe('DataTable.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<DataTable>My data</DataTable>);

    expect(wrapper).toBeDefined();
  });
});
