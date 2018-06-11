import StaffList from './StaffList';
import { shallow } from 'enzyme';
import { StaffMember, PermissionLevel } from './types';
import * as React from 'react';

describe('StaffList.tsx', () => {
  it('renders staff members', () => {
    const staff: StaffMember[] = [
      {
        email: 'test@example.com',
        pendingInvite: true,
      },
      {
        email: 'test2@example.com',
        pendingInvite: false,
        name: 'John Smith',
        permissionLevel: PermissionLevel.Administrator,
      },
    ];

    const wrapper = shallow(<StaffList staff={staff} />);

    expect(wrapper.children()).toHaveLength(2);
  });
});
