import { Flex } from 'grid-styled';
import React from 'react';

const DataTable: React.SFC<{}> = ({ children }) => (
  <Flex mb={3} flexDirection="column">
    {children}
  </Flex>
);

export default DataTable;
