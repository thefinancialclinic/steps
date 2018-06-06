import React from 'react';
import { HTMLProps } from 'helpers/types';
import styled from 'styled-components';
import { mediumBlue } from 'styles/colors';

const TableRow: React.SFC<HTMLProps> = ({ children, className }) => {
  return <StyledTableRow className={className}>{children}</StyledTableRow>;
};

const StyledTableRow = styled.tr`
  border-bottom: 1px solid ${mediumBlue};
`;

export default TableRow;
