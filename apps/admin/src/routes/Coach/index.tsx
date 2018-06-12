import React from 'react';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from 'routes/PrivateRoute';

import TopBar from 'components/TopBar';
import Home from './Home';
import Clients from './Clients';
import Client from './Client';
import NewClient from './NewClient';
import Alert from 'containers/Alert';
import { User } from 'reducers/auth';

type Props = {
  user: User;
};
const Coach = ({ user }: Props) => {
  return (
    <div>
      <TopBar user={user} />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/clients" component={Clients} />
        <PrivateRoute exact path="/clients/new" component={NewClient} />
        <PrivateRoute path="/clients/:id" component={Client} />
      </Switch>
    </div>
  );
};

export default Coach;
