import React from 'react';

const Coach = ({ user }) => {
  return (
    <div>
      <h1>Coach Route</h1>
      <h2>
        {user.first_name} {user.last_name}
      </h2>
    </div>
  );
};

export default Coach;
