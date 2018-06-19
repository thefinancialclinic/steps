import React from 'react';
import { RoutesElement } from '../index';
import TopBar from 'components/TopBar';
import Alert from 'containers/Alert';

const Superadmin: RoutesElement = ({ user }) => (
  <div>
    <TopBar user={user} />
    <Alert />
    <h1>Superadmin Route</h1>
  </div>
);

export default Superadmin;
