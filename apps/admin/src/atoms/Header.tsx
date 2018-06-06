import { Flex } from 'grid-styled';
import { HTMLProps } from 'helpers/types';
import React from 'react';

const Header: React.SFC<HTMLProps> = ({ className, children }) => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    className={className}
  >
    {children}
  </Flex>
);

export default Header;
