import NavDropdown from 'components/Dropdowns/NavDropdown';
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Org } from 'reducers/auth';
import styled from 'styled-components';
import { darkBlue, white } from 'styles/colors';
import { serif } from 'styles/type';

interface Props {
  color?: string;
  user: User;
  org?: Org;
}

class TopBar extends React.Component<Props> {
  navLinks() {
    const { user } = this.props;
    if (user.type === 'Admin') {
      return [{ to: '/profile', text: 'My Profile' }];
    } else if (user.type === 'Coach') {
      return [
        { to: '/clients', text: 'My Clients' },
        { to: '/clients/new', text: 'Add New Client' },
      ];
    } else if (user.type === 'Client') {
      return [
        { to: '/tasks', text: 'My Tasks' },
        { to: '/goals', text: 'My Goals' },
      ];
    } else {
      return [];
    }
  }

  render() {
    const { user, org } = this.props;

    return (
      <StyledTopBar>
        <Link to="/">{org && org.name}</Link>
        <NavDropdown
          title={`${user.first_name} ${user.last_name}`}
          links={this.navLinks()}
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
    font-family: ${serif};
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
