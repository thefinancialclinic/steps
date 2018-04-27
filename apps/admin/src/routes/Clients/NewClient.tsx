import React from 'react';
import { Link } from 'react-router-dom';

export default class NewClient extends React.Component {
  render () {
    return (
      <div>
        <h2>New Client</h2>
        <Link to="/">Home</Link>
      </div>
    );
  }
}
