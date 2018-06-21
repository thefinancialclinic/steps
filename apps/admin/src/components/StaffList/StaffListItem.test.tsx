import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import StaffListItem from './StaffListItem';

describe('StaffListItem.tsx', () => {
  it('renders correctly', () => {
    const coach = { email: 'test@example.com ' };
    const wrapper = shallow(<StaffListItem staffMember={coach} />);

    expect(wrapper).toBeDefined();
  });
});
