import React from 'react';
import styled from 'styled-components';

import { white } from 'styles/colors';
import SidebarItem from './SidebarItem';

interface Props {
}

class Sidebar extends React.Component<Props, {}> {
  render() {
    return (
      <StyledSidebar>
        <SidebarItem to='/tasks'>Tasks</SidebarItem>
        <SidebarItem to='/goals'>Goals</SidebarItem>
        <SidebarItem to='/chat'>Chat</SidebarItem>
      </StyledSidebar>
    );
  }
}

const StyledSidebar = styled.div`
  background-color: ${white};
  display: flex;
  flex-direction: column;
`;

export default Sidebar;
