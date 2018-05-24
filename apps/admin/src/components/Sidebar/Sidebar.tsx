import React from 'react';
import styled from 'styled-components';

import { green, white } from 'styles/colors';
import SidebarItem from './SidebarItem';

interface Props {
  links: {
    to: string;
    text: string;
  }[]
}

class Sidebar extends React.Component<Props, {}> {
  render() {
    return (
      <StyledSidebar>
        {this.props.children}
        {this.props.links.map((link, i) => <SidebarItem to={link.to} key={i}>{link.text}</SidebarItem>)}
      </StyledSidebar>
    );
  }
}

const StyledSidebar = styled.div`
  background-color: ${white};
  box-shadow: -30px 0 0 0 ${green};
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 370px;
  margin-left: 30px;
  padding-left: 1.5em;
`;

export default Sidebar;
