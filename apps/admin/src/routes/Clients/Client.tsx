import React from 'react';
import { Link } from 'react-router-dom';

export default class Client extends React.Component {
  render () {
    return (
      <div>
        <h2>Client</h2>
        <Link to="/">Home</Link>
        <Link to="/clients/1/tasks/new">New Task</Link>
      </div>
    );
  }
}
