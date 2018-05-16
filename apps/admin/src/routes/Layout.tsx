import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import 'styles/global';

import TopBar from 'components/TopBar';

import Home from './Home';
import Clients from './Clients/Clients';
import Client from './Clients/Client';
import NewClient from './Clients/NewClient';
import Admin from './Admin';

const Layout = () => (
  <div>
    <TopBar title='boop' />
    <Switch>
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/clients/new" component={NewClient} />
        <Route path="/clients/:id" component={Client} />

        <Route exact path='/admin' component={Admin} />
        <Route exact path='/admin/:route' component={Admin} />
      </Switch>
    </Switch>
  </div>
);

export default Layout;
