import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import Signup from 'routes/Auth/Signup';
import Authenticate from 'routes/Auth/Authenticate';
import Logout from 'routes/Auth/Logout';
import ClientLogin from 'routes/Auth/ClientLogin';

class Routes extends React.Component<any, any> {
  render() {
    return (
      <Switch>
        <Route path="/my-tasks" component={ClientLogin} />
        <Route path="/signup" component={Signup} />
        <Route path="/authenticate" component={Authenticate} />
        <Route path="/logout" component={Logout} />
        {this.props.children}
      </Switch>
    );
  }
}

export default withRouter(Routes);
