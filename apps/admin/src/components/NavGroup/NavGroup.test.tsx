import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import NavGroup from './NavGroup';

describe('NavGroup.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NavGroup links={[]} />);

    expect(wrapper).toBeDefined();
  });
});
