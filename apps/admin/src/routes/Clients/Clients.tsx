import React from 'react';
import { Link } from 'react-router-dom';


export default class Clients extends React.Component {
  render () {
    return (
      <div>
        <h2>My Clients</h2>
        <Link to="/">Home</Link>
        <Link to="/clients/1">Client 1</Link>
        <Link to="/clients/2">Client 2</Link>
      </div>
    );
  }
}
