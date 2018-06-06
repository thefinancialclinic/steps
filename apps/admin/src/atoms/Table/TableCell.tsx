import React from 'react';
import styled from 'styled-components';

const TableCell: React.SFC<{}> = ({ children }) => {
  return <StyledTableData>{children}</StyledTableData>;
};

const StyledTableData = styled.td`
  padding-top: 30px;
  padding-bottom: 30px;
`;

export default TableCell;
