import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import TableBody from './TableBody';

describe('TableBody.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TableBody>some table content</TableBody>);

    expect(wrapper).toBeDefined();
  });
});
