import React from 'react';
import { RoutesElement } from '../index';

const Client: RoutesElement = ({ user }) => (
  <div>
    <h1>Client Route</h1>
    {user && (
      <h2>
        {user.first_name} {user.last_name}
      </h2>
    )}
  </div>
);

export default Client;
