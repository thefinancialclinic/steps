import UserProfile from 'components/Admin/UserProfile';
import { Box } from 'grid-styled';
import React from 'react';
import { User } from 'reducers/auth';

interface Props {
  user: User;
}

export class Profile extends React.Component<Props> {
  get fullName() {
    const { user } = this.props;
    return `${user.first_name} ${user.last_name}`;
  }

  render() {
    return (
      <Box width={1} p={4}>
        <UserProfile name={this.fullName} email={this.props.user.email} />
      </Box>
    );
  }
}

export default Profile;
