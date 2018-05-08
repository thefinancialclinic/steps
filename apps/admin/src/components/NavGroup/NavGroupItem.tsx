import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { blue, green, lightBlue, mediumBlue, white } from 'styles/colors';

interface Props {
  className?: string;
  link: NavGroupLink;
}

class NavGroupItem extends React.Component<Props, {}> {
  render() {
    const { className, link } = this.props;

    return (
      <NavLink to={link.to} className={className} activeClassName="active">
        {link.text}
      </NavLink>
    );
  }
}

const StyledNavGroupItem = styled(NavGroupItem)`
  background-color: ${lightBlue};
  border-right: 1px solid ${mediumBlue};
  color: ${blue};
  padding-bottom: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.5em;
  text-decoration: none;
  text-transform: uppercase;

  &.active {
    background-color: ${white};
    color: ${green};
  }

  &:last-child {
    border: none;
  }
`;

export default StyledNavGroupItem;
