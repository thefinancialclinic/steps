import React from 'react';
import { HTMLProps } from 'helpers/types';
import styled from 'styled-components';

const Table: React.SFC<HTMLProps> = ({ children, className }) => {
  return <StyledTable className={className}>{children}</StyledTable>;
};

const StyledTable = styled.table`
  border-collapse: collapse;
  margin-bottom: 30px;
`;

export default Table;
