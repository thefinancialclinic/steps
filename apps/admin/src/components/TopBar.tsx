import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  darkBlue,
  white,
} from 'styles/colors';

interface Props {
  className?: string;
  color?: string;
  title?: string;
}

class TopBar extends React.Component<Props, {}> {

  render() {
    const { className, title } = this.props;

    return (
      <div className={className}>
        <Link to='/'>{title}</Link>
        <div className='profile-dropdown'>User Dropdown</div>
      </div>
    );
  }
}

const StyledTopBar = styled(TopBar)`
  background-color: ${props => props.color};
  color: ${white};
  display: flex;
  font-size: 20px;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 13px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 13px;

  a {
    color: ${white};
    font-family: 'Tiempos', serif;
    font-size: 20px;
    font-weight: 600;
    text-decoration: none;
  }

  .profile-dropdown {
    font-size: 16px;
    font-weight: 500;
    text-align: right;
    text-transform: uppercase;
  }
`;

StyledTopBar.defaultProps = {
  color: darkBlue,
  title: 'Some Organization Name'
}

export default StyledTopBar;
