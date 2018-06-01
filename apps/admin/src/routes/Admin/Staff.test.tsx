import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { Staff } from './Staff';

describe('Staff', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Staff />);

    expect(wrapper).toMatchSnapshot();
  });
});
