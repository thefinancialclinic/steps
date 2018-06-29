import OrganizationProfile from 'components/Admin/OrganizationProfile';
import { shallow } from 'enzyme';
import React from 'react';
import { Org } from 'reducers/auth';
import Organization from './Organization';

const org: Org = {
  name: 'My organization',
};

describe('Organization.tsx', () => {
  it('displays a user profile', () => {
    const wrapper = shallow(<Organization org={org} />);

    const profile = wrapper.find(OrganizationProfile);

    expect(profile).toBeDefined();
    expect(profile.props().name).toEqual('My organization');
  });
});
