import React from 'react';
import { injectGlobal } from 'styled-components';
import { Link, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Clients from './Clients/Clients';
import Client from './Clients/Client';
import NewClient from './Clients/NewClient';

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
