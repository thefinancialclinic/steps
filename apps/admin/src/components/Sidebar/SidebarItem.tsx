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
        {children}
      </NavLink>
    );
  }
}

const StyledSidebarItem = styled(SidebarItem)`
  color: ${blue};
  display: block;
  font-size: 1.25em;
  margin-bottom: 1.5em;
  margin-left: 2em;
  position: relative;
  text-decoration: none;

  &.active {
    color: ${green};

    &:after {
      background-color: ${green};
      content: '';
      position: absolute;
      right: 0;
      top: 0.5em;
      left: 100px;
      height: 2px;
    }
  }
`;

export default StyledSidebarItem;
