import React from 'react';
import styled from 'styled-components';
import { Link, Route, Switch } from 'react-router-dom';

import TopBar from 'components/TopBar';
import Home from './Home';
import Clients from './Clients/Clients';
import Client from './Clients/Client';
import NewClient from './Clients/NewClient';
import AdminSignup from './Admin/Signup';
import Admin from './Admin';
import Alert from 'containers/Alert';
import AdminNewStaff from './Admin/NewStaff';

const Layout = () => (
  <Wrapper>
    <TopBar />
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

export default Layout;
