import OrganizationProfile from 'components/Admin/OrganizationProfile';
import { Box } from 'grid-styled';
import React from 'react';
import { User } from 'reducers/auth';

interface Props {
  user: User;
}

export class Organization extends React.Component<Props> {
  get orgName() {
    const { user } = this.props;
    if (user.org) {
      return user.org.name;
    }
  }

  render() {
    return (
      <Box width={1} p={4}>
        <OrganizationProfile name={this.orgName} />
      </Box>
    );
  }
}

export default Organization;
