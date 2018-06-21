import { shallow } from 'enzyme';
import { Profile } from './Profile';
import { User } from 'reducers/auth';
import UserProfile from 'components/Admin/UserProfile';
import React from 'react';

const testUser: User = {
  first_name: 'Jane',
  last_name: 'Smith',
  email: 'jane@example.com',
};

describe('Profile.tsx', () => {
  it('displays a user profile', () => {
    const wrapper = shallow(<Profile user={testUser} />);

    const profile = wrapper.find(UserProfile);

    expect(profile).toBeDefined();
    expect(profile.props().name).toEqual('Jane Smith');
    expect(profile.props().email).toEqual('jane@example.com');
  });
});
