import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import 'styles/global';
import Home from './Home';
import Clients from './Clients/Clients';
import Client from './Clients/Client';
import NewClient from './Clients/NewClient';

import AdminOrganization from './Admin/Organization';
import AdminProfile from './Admin/Profile';
import AdminSignup from './Admin/Signup';
import AdminStaff from './Admin/Staff';

const Layout = () => (
  <div>
    <Link to='/'>Home</Link>
    <Switch>
      <Route exact path="/" component={Home} />
      <Switch>
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/clients/new" component={NewClient} />
        <Route path="/clients/:id" component={Client} />

        <Route exact path='/admin' component={AdminSignup} />
        <Route path='/admin/signup' component={AdminSignup} />
        <Route path='/admin/profile' component={AdminProfile} />
        <Route path='/admin/organization' component={AdminOrganization} />
        <Route path='/admin/staff' component={AdminStaff} />
      </Switch>
    </Switch>
  </div>
);

export default Layout;
