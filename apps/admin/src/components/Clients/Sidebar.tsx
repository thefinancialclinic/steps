import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  className?: string;
  clientName?: string;
}

class Sidebar extends React.Component<Props, {}> {
  static defaultProps = {
    clientName: 'Janice Page',
  };

  render () {
    return (
      <div className={this.props.className}>
        <h1>{this.props.clientName}</h1>
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
