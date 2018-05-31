import 'jest';
import { Staff } from '../Staff';
import { shallow, mount } from 'enzyme';
import * as React from 'react';

describe('Staff', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Staff />);

    expect(wrapper).toMatchSnapshot();
  });
});
