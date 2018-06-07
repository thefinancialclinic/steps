import { Flex } from 'grid-styled';
import React from 'react';

const Header: React.SFC<{}> = ({ children }) => (
  <Flex alignItems="center" justifyContent="space-between">
    {children}
  </Flex>
);

export default Header;
