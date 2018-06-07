import React from 'react';
import styled from 'styled-components';

const Table: React.SFC<{}> = ({ children }) => {
  return <StyledTable>{children}</StyledTable>;
};

const StyledTable = styled.table`
  border-collapse: collapse;
  margin-bottom: 30px;
`;

export default Table;
