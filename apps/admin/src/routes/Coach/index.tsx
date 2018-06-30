import TopBar from 'components/TopBar';
import Alert from 'containers/Alert';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { User } from 'reducers/auth';
import { RoutesElement } from '../index';
import Clients from './Clients/List';
import ClientNew from './Clients/New';
import ClientProfile from './Clients/Profile';
import Home from './Home';

type Props = {
  history: any;
  user: User;
};

const Coach: RoutesElement = ({ user, org }) => {
  return (
    <div>
      <TopBar user={user} org={org} />
      <Alert />

      <Switch>
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/clients/new" component={ClientNew} />
        <Route path="/clients/:id" component={ClientProfile} />
        <Route exact path="/" component={Home} />
        <Route render={_props => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default Coach;
