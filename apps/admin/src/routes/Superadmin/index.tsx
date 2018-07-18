import React from 'react';
import { RoutesElement } from '../index';
import TopBar from 'components/TopBar';
import Alert from 'containers/Alert';
import GraphQL from 'components/Superadmin/GraphQL';

const Superadmin: RoutesElement = ({ user, org }) => (
  <div>
    <TopBar user={user} org={org} />
    <Alert />
    <GraphQL />
  </div>
);

export default Superadmin;
