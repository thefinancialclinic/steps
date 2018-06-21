import OrganizationProfile from 'components/Admin/OrganizationProfile';
import { shallow } from 'enzyme';
import React from 'react';
import { User } from 'reducers/auth';
import { Organization } from './Organization';

const testUser: User = {
  first_name: 'Jane',
  last_name: 'Smith',
  email: 'jane@example.com',
  org: {
    name: 'My organization',
  },
};

describe('Organization.tsx', () => {
  it('displays a user profile', () => {
    const wrapper = shallow(<Organization user={testUser} />);

    const profile = wrapper.find(OrganizationProfile);

    expect(profile).toBeDefined();
    expect(profile.props().name).toEqual('My organization');
  });
});
