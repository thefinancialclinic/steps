import NavDropdown from 'components/Dropdowns/NavDropdown';
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'reducers/auth';
import styled from 'styled-components';
import { darkBlue, white } from 'styles/colors';
import { serif } from 'styles/type';

interface Props {
  color?: string;
  user?: User;
}

class TopBar extends React.Component<Props> {
  render() {
    const { user } = this.props;

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
