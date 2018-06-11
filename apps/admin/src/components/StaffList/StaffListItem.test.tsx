import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import StaffListItem from './StaffListItem';

describe('StaffListItem.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <StaffListItem pendingInvite={true} email="email@example.com" />,
    );

    expect(wrapper).toBeDefined();
  });
});
