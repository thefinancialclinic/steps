import React from 'react';
import { RoutesElement } from '../index';
import TopBar from 'components/TopBar';
import Alert from 'containers/Alert';

const Client: RoutesElement = ({ user }) => (
  <div>
    <TopBar user={user} />
    <Alert />
    <h1>Client Route</h1>
  </div>
);

export default Client;
