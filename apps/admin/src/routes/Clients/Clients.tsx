import React from 'react';
import { Link } from 'react-router-dom';

export default class Clients extends React.Component {
  render () {
    return (
      <div>
        <h2>Clients</h2>
        <Link to="/">Home</Link>
        <div>
          <Link to="/clients/new">New Client</Link>
          <Link to="/clients/1">Client</Link>
          <Link to="/clients/1/tasks">Tasks</Link>
        </div>
      </div>
    );
  }
}
