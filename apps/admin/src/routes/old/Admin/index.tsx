import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Sidebar from 'components/Sidebar/Sidebar';
import AdminOrganization from './Organization';
import AdminProfile from './Profile';
import AdminSignup from './Signup';
import AdminStaff from './Staff';
import { Flex, Box } from 'grid-styled';

interface Props {
  className?: string;
}

class Profile extends React.Component<Props, {}> {
  render() {
    return (
      <Flex>
        <Box width={[1, 1 / 3]}>
          <Sidebar
            links={[
              { to: '/admin/profile', text: 'My Profile' },
              { to: '/admin/organization', text: 'Organization Info' },
              { to: '/admin/staff', text: 'Manage Staff' },
            ]}
          />
        </Box>
        <Box width={[1, 2 / 3]}>
          <Switch>
            <Route path="/admin/signup" component={AdminSignup} />
            <Route path="/admin/profile" component={AdminProfile} />
            <Route path="/admin/organization" component={AdminOrganization} />
            <Route path="/admin/staff" component={AdminStaff} />
          </Switch>
        </Box>
      </Flex>
    );
  }
}

export default Profile;
