import React from 'react';
import { injectGlobal } from 'styled-components';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Tasks from './Tasks';
import Clients from './Clients/Clients';
import Client from './Clients/Client';
import NewClient from './Clients/NewClient';
import NewTask from './Tasks/NewTask';

injectGlobal`
  html, body {
    margin: 0;
    height: 100%;
  }

  body {
    background-color: #e8f5f9;
    color: #464646;
    font-family: sans-serif;
  }
`;

const Layout = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Switch>
      <Route exact path="/clients" component={Clients} />
      <Route exact path="/clients/new" component={NewClient} />
      <Route exact path="/clients/:id" component={Client} />
      <Route exact path="/clients/:id/tasks" component={Tasks} />
      <Route exact path="/clients/:id/tasks/new" component={NewTask} />
    </Switch>
  </Switch>
);

export default Layout;
