import React from 'react';

const Client = ({ user }) => {
  return (
    <div>
      <h1>Client Route</h1>
      <h2>
        {user.first_name} {user.last_name}
      </h2>
    </div>
  );
};

export default Client;
