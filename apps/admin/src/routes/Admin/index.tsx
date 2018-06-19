import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RoutesProps } from '../index';
import { composeUserLayout } from 'layouts';
import AdminProfile from './Profile';
import AdminOrganization from './Organization';
import AdminStaff from './Staff';

type Params = { id: number };

class Admin extends React.Component<RoutesProps, {}> {
  render() {
    const { user } = this.props;
    if (!user) return null;

    const links = [
      { text: 'My Profile', to: '/profile' },
      { text: 'Organization Info', to: '/organization' },
      { text: 'Staff', to: '/staff' },
    ];

    const composeLayout = Component =>
      composeUserLayout(Component, { links, client: user, role: user.type });

    return (
      <Switch>
        <Route path="/profile" render={composeLayout(AdminProfile)} />
        <Route path="/organization" render={composeLayout(AdminOrganization)} />
        <Route path="/staff" render={composeLayout(AdminStaff)} />
        <Route render={() => <Redirect to="/profile" />} />
      </Switch>
    );
  }
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(Admin);
