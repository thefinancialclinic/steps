import React from 'react';
import PropTypes from 'prop-types';
import { HTMLProps } from 'helpers/types';
import styled from 'styled-components';

const TableCell: React.SFC<HTMLProps> = ({ children, className }) => {
  return <StyledTableData className={className}>{children}</StyledTableData>;
};

const StyledTableData = styled.td`
  padding-top: 30px;
  padding-bottom: 30px;
`;

export default TableCell;
