import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import 'styles/global';
import Home from './Home';
import Clients from './Clients/Clients';
import Client from './Clients/Client';
import NewClient from './Clients/NewClient';

const Layout = () => (
  <div>
    <Link to='/'>Home</Link>
    <Switch>
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/clients/new" component={NewClient} />
        <Route path="/clients/:id" component={Client} />
      </Switch>
    </Switch>
  </div>
);

export default Layout;
