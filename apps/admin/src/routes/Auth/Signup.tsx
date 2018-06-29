import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import AdminSignup from 'components/Signup/AdminSignup';
import CoachSignup from 'components/Signup/CoachSignup';
import AuthLayout from 'layouts/AuthLayout';

class Signup extends React.Component<any, any> {
  render() {
    return (
      <AuthLayout>
        <Switch>
          <Route path="/signup/:orgId" component={CoachSignup} />
          <Route path="/signup" component={AdminSignup} />
        </Switch>
      </AuthLayout>
    );
  }
}

export default withRouter(Signup);
