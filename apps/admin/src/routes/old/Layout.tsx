import React from 'react';
import styled from 'styled-components';
import { Link, Route, Switch, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import UserSwitcher from 'components/util/UserSwitcher';

import TopBar from 'components/TopBar';
import Home from './Home';
import Clients from '../Coach/Clients';
import Client from '../Coach/Client';
import NewClient from '../Coach/NewClient';
import AdminSignup from './Admin/Signup';
import Admin from './Admin';
import Alert from 'containers/Alert';
import AdminNewStaff from './Admin/NewStaff';

const Layout: React.SFC = props => (
  <Wrapper>
    {process.env.NODE_ENV === 'development' && <UserSwitcher />}
    <TopBar user={null} />
    <Alert />
    <Switch>
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/clients/new" component={NewClient} />
        <Route path="/clients/:id" component={Client} />

        <Route exact path="/admin" component={AdminSignup} />
        <Route exact path="/admin/signup" component={AdminSignup} />
        <Route path="/admin/:route" component={Admin} />
      </Switch>
    </Switch>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps)(Layout));
