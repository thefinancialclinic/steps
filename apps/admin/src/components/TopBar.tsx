import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User } from 'reducers/auth';

const apiUrl = process.env.API_URL || 'http://localhost:3001/api';

import NavDropdown from 'components/Dropdowns/NavDropdown';
import { darkBlue, white } from 'styles/colors';

interface Props {
  color?: string;
  title?: string;
  user?: User;
}

class TopBar extends React.Component<Props> {
  render() {
    const { user, title } = this.props;
    console.log(user);

    return (
      <StyledTopBar>
        <Link to="/">{user.org.name}</Link>
        <NavDropdown
          title={`${user.first_name} ${user.last_name}`}
          links={[
            { to: '/clients', text: 'My Clients' },
            { to: '/clients/new', text: 'Add New Client' },
          ]}
        />
      </StyledTopBar>
    );
  }
}

const StyledTopBar = styled.div`
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
`;

StyledTopBar.defaultProps = {
  color: darkBlue,
  title: 'Some Organization Name',
};

export default TopBar;
