import Table from 'atoms/Table/Table';
import React from 'react';
import TableBody from 'atoms/Table/TableBody';
import styled from 'styled-components';

const DataTable: React.SFC<{}> = ({ children }) => (
  <StyledTable>
    <TableBody>{children}</TableBody>
  </StyledTable>
);

const StyledTable = styled(Table)`
  width: 100%;
`;

export default DataTable;
