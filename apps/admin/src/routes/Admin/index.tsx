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

interface Props {
  className?: string;
}

class Profile extends React.Component<Props, {}> {
  render() {
    return (
      <StyledProfile>
        <Sidebar
          links={[
            { to: '/admin/profile', text: 'My Profile' },
            { to: '/admin/organization', text: 'Organization Info' },
            { to: '/admin/staff', text: 'Manage Staff' }
          ]}
        />
        <Switch>
          <Route path="/admin/signup" component={AdminSignup} />
          <Route path="/admin/profile" component={AdminProfile} />
          <Route path="/admin/organization" component={AdminOrganization} />
          <Route path="/admin/staff" component={AdminStaff} />
        </Switch>
      </StyledProfile>
    );
  }
}
const StyledProfile = styled.div`
  display: flex;
  flex-direction: row;
`;

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
