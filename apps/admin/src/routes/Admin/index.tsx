import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import AdminOrganization from './Organization';
import AdminProfile from './Profile';
import AdminSignup from './Signup';
import AdminStaff from './Staff';

interface Props {
  className?: string;
}

class Profile extends React.Component<Props, {}> {
  render () {
    return (
      <Switch>
        <Route path='/admin/signup' component={AdminSignup} />
        <Route path='/admin/profile' component={AdminProfile} />
        <Route path='/admin/organization' component={AdminOrganization} />
        <Route path='/admin/staff' component={AdminStaff} />
      </Switch>
    );
  }
}
const StyledProfile = styled(Profile)`
display: flex;
`;

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledProfile);
