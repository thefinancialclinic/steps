import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import DataRow from './DataRow';

describe('DataRow.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<DataRow label="label">My data</DataRow>);

    expect(wrapper).toBeDefined();
  });
});
