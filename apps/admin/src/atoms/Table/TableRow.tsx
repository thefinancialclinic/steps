import React from 'react';
import styled from 'styled-components';
import { mediumBlue } from 'styles/colors';

const TableRow: React.SFC<{}> = ({ children }) => {
  return <StyledTableRow>{children}</StyledTableRow>;
};

const StyledTableRow = styled.tr`
  border-bottom: 1px solid ${mediumBlue};
`;

export default TableRow;
