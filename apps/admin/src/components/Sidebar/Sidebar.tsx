import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

import { green, white } from 'styles/colors';
import SidebarItem from './SidebarItem';

interface Props {
  links: {
    to: string;
    text: string;
  }[];
}

class Sidebar extends React.Component<Props, {}> {
  render() {
    return (
      <StyledSidebar
        className="sidebar"
        alignItems={['center', 'flex-start']}
        mx={['0', '30px']}
        pl={['0', '1.5em']}
        pt={['1em', '3em']}
      >
        {this.props.children}
        <Flex
          flexDirection={['row', 'column']}
          justifyContent={['stretch', 'flex-start']}
          width={1}
        >
          {this.props.links.map((link, i) => (
            <SidebarItem to={link.to} key={i}>
              {link.text}
            </SidebarItem>
          ))}
        </Flex>
      </StyledSidebar>
    );
  }
}

const StyledSidebar = styled(Flex)`
  background-color: ${white};
  box-shadow: -30px 0 0 0 ${green};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default Sidebar;
