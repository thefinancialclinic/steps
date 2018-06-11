import React from 'react';
import styled from 'styled-components';

import NavGroupItem from './NavGroupItem';
import { mediumBlue } from 'styles/colors';

interface Props {
  className?: string;
  links: NavGroupLink[];
}

class NavGroup extends React.Component<Props, {}> {
  render() {
    const { className, links } = this.props;

    return (
      <div className={className}>
        <div className="nav-group">
          {links.map((link, key) => <NavGroupItem key={key} link={link} />)}
        </div>
      </div>
    );
  }
}

const StyledNavGroup = styled(NavGroup)`
  display: inline-block;

  .nav-group {
    border-radius: 3px;
    box-shadow: 0 0 0 1px ${mediumBlue};
    display: flex;
    overflow: hidden;
  }
`;

export default StyledNavGroup;
