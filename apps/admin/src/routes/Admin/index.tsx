import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { RoutesElement } from '../index';
import { composeUserLayout } from 'layouts';

import AdminProfile from './Profile';
import AdminEditProfile from './EditProfile';
import AdminOrganization from './Organization';
import AdminEditOrganization from './EditOrganization';
import AdminStaff from './Staff';
import TopBar from 'components/TopBar';
import Alert from 'containers/Alert';

const Admin: RoutesElement = ({ user, org }) => {
  if (!user) return null;

  const links = [
    { text: 'My Profile', to: '/profile' },
    { text: 'Organization Info', to: '/organization' },
    { text: 'Staff', to: '/staff' },
  ];

  const composeLayout = Component =>
    composeUserLayout(Component, { links, user, role: user.type });

  return (
    <div>
      <TopBar user={user} org={org} />
      <Alert />
      <Switch>
        <Route path="/profile/edit" render={composeLayout(AdminEditProfile)} />
        <Route path="/profile" render={composeLayout(AdminProfile)} />
        <Route
          path="/organization/edit"
          render={composeLayout(AdminEditOrganization)}
        />
        <Route path="/organization" render={composeLayout(AdminOrganization)} />
        <Route path="/staff" render={composeLayout(AdminStaff)} />
        <Route render={() => <Redirect to="/profile" />} />
      </Switch>
    </div>
  );
};

export default Admin;
