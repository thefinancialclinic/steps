import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import Dropdown from './Dropdown';
import { blue, lightBlue, grey, green } from 'styles/colors';
import { sansSerif } from 'styles/type';

interface Link {
  to: string;
  text: string;
  className?: string;
}

interface Props {
  title: string;
  links?: Link[];
  className?: string;
}

export const LinkList = props => {
  const { links, className } = props;
  const linkElements = links.map((link, key) => {
    return (
      <li key={key}>
        <NavLink to={link.to} className={link.className}>
          {link.text}
        </NavLink>
      </li>
    );
  });
  return (
    <div className={className}>
      <ul>{linkElements}</ul>
    </div>
  );
};

export class NavDropdown extends React.Component<Props, {}> {
  static defaultProps = {
    links: [],
  };

  render() {
    const { title, links, className } = this.props;
    return (
      <Dropdown title={title} className={className}>
        <LinkList className="contextual-links" links={links} />
        <LinkList
          className="global-links"
          links={[
            { to: '#my-profile', text: 'My Profile', className: 'my-profile' },
            { to: '/logout', text: 'Log Out', className: 'log-out' },
          ]}
        />
      </Dropdown>
    );
  }
}

const StyledNavDropdown = styled(NavDropdown)`
  min-width: 190px;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 500;
  font-family: ${sansSerif};
  letter-spacing: 1px;

  .dropdown-toggle {
    text-align: right;
  }

  .dropdown {
    margin-top: 9px;
    right: 0px;
  }

  .arrow-up {
    margin-left: 180px;
  }

  .dropdown-content {
    text-align: left;
    padding-left: 0;
    padding-right: 0;

    ul {
      margin: 0;
      padding: 0 16px;
      list-style: none;
    }

    li {
      padding: 16px;
    }

    a {
      font-family: ${sansSerif};
      font-size: 16px;
      font-weight: 500;
      text-decoration: none;
      color: ${green};
    }

    a.log-out {
      color: ${grey};
    }

    a.my-profile {
      color: ${blue};
    }
  }

  .dropdown-content > :last-child {
    border-top: 1px solid ${lightBlue};
  }
`;

export default StyledNavDropdown;
