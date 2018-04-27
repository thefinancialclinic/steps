import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <h2>Home</h2>
        <Link to="/tasks">Tasks</Link>
        <Link to="/clients">My Clients</Link>
      </div>
    );
  }
}
