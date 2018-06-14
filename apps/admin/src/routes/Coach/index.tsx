import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import TopBar from 'components/TopBar';
import Home from './Home';
import Clients from './Clients/List';
import ClientProfile from './Clients/Profile';
import ClientNew from './Clients/New';
// import Alert from 'containers/Alert';
import { User } from 'reducers/auth';

type Props = {
  history: any;
  user: User;
};

const Coach: React.SFC<Props> = ({ history, user }) => {
  return (
    <div>
      <TopBar user={user} />
      <Switch>
        <Route exact path="/clients" component={Clients} />
        <Route exact path="/clients/new" component={ClientNew} />
        <Route path="/clients/:id" component={ClientProfile} />
        <Route exact path="/" component={Home} />
        <Route render={props => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default Coach;
