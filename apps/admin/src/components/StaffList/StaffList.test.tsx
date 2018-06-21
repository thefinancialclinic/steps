import StaffList from './StaffList';
import { shallow } from 'enzyme';
import * as React from 'react';
import { User, USER_TYPE } from '../../reducers/auth';

describe('StaffList.tsx', () => {
  it('renders staff members', () => {
    const staff: User[] = [
      {
        email: 'test@example.com',
        type: USER_TYPE.COACH,
      },
      {
        email: 'test2@example.com',
        type: USER_TYPE.PENDING_INVITE,
      },
    ];

    const wrapper = shallow(
      <StaffList
        onDelete={() => {}}
        onUpdateRole={() => {}}
        onResend={() => {}}
        staff={staff}
      />,
    );

    expect(wrapper.children()).toHaveLength(2);
  });
});
