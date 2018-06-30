import React from 'react';
import { RoutesElement } from '../index';
import TopBar from 'components/TopBar';
import Alert from 'containers/Alert';

const Superadmin: RoutesElement = ({ user, org }) => (
  <div>
    <TopBar user={user} org={org} />
    <Alert />
    <h1>Superadmin Route</h1>
  </div>
);

export default Superadmin;
