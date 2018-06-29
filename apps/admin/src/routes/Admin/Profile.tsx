import UserProfile from 'components/Admin/UserProfile';
import { Box } from 'grid-styled';
import React from 'react';
import { User } from 'reducers/auth';

interface Props {
  user: User;
}

export class Profile extends React.Component<Props> {
  render() {
    const { user } = this.props;
    return (
      <Box width={1} p={4}>
        <UserProfile
          email={user.email}
          firstName={user.first_name}
          lastName={user.last_name}
        />
      </Box>
    );
  }
}

export default Profile;
