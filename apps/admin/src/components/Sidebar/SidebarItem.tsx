import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { resolve } from 'path';
import { Box, Flex } from 'grid-styled';
import { display, textAlign } from 'styled-system';

import { green, blue, white } from 'styles/colors';

interface Props {
  children?: any;
  className?: string;
  to: string;
}

class SidebarItem extends React.Component<Props, {}> {
  render() {
    const { children, className, to } = this.props;

    return (
      <Box mb={[0, '1.5em']} ml={[0, '2em']} width={[1 / 2, 'auto']}>
        <NavLink
          to={resolve(to)}
          className={className}
          activeClassName="active"
        >
          <Text
            flexDirection={['column', 'row']}
            justifyContent={['center', 'flex-start']}
            alignItems={['center']}
            textAlign={['center', 'left']}
            width={1}
          >
            <span className="text">{children}</span>
            <Box className="bar" ml={[0, '20px']} mt={['0.5em', 0]} width={1} />
          </Text>
        </NavLink>
      </Box>
    );
  }
}

const Text = styled(Flex)`
  ${textAlign};
`;

const StyledSidebarItem = styled(SidebarItem)`
  color: ${blue};
  display: flex;
  font-size: 1.25em;
  justify-content: stretch;
  text-decoration: none;

  .text {
    display: inline-block;
  }

  &.active {
    color: ${green};

    .bar {
      background-color: ${green};
      flex: 2;
      height: 2px;
    }
  }
`;

export default StyledSidebarItem;
