import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { green, blue, white } from 'styles/colors';

interface Props {
  children?: any;
  className?: string;
  to: string;
}

class SidebarItem extends React.Component<Props, {}> {
  render() {
    const { children, className, to } = this.props;

    return (
      <NavLink to={to} className={className} activeClassName="active">
        <span>{children}</span>
        <div className="bar" />
      </NavLink>
    );
  }
}

const StyledSidebarItem = styled(SidebarItem)`
  color: ${blue};
  display: flex;
  font-size: 1.25em;
  align-items: center;
  justify-content: stretch;
  margin-bottom: 1.5em;
  margin-left: 2em;
  text-decoration: none;

  &.active {
    color: ${green};

    .bar {
      background-color: ${green};
      flex: 2;
      margin-left: 20px;
      height: 2px;
    }
  }
`;

export default StyledSidebarItem;
