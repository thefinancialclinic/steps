import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  className?: string;
  client: {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
  };
}

class Sidebar extends React.Component<Props, {}> {
  render () {
    return (
      <div className={this.props.className}>
        <Link to='/clients'>&larr; My Clients</Link>
        <h1>{this.props.client.firstName} {this.props.client.lastName}</h1>
        <div className='navigation'>
          <NavLink to="/clients/1/tasks">Tasks</NavLink>
          <NavLink to="/clients/1/goals">Goals</NavLink>
          <NavLink to="/clients/1/chat">Chat</NavLink>
        </div>
      </div>
    );
  }
}

const StyledSidebar = styled(Sidebar)`
.navigation {
  display: flex;
  flex-direction: column;
}
`;

export default StyledSidebar;
