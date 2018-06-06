import React from 'react';
import TableCell from 'atoms/Table/TableCell';
import TableRow from 'atoms/Table/TableRow';
import Label from 'atoms/Label';
import { HTMLProps } from 'helpers/types';

interface Props extends HTMLProps {
  label: string;
}

const DataRow: React.SFC<Props> = ({ label, className, children }) => (
  <TableRow className={className}>
    <TableCell>
      <Label>{label}</Label>
    </TableCell>
    <TableCell>{children}</TableCell>
  </TableRow>
);

export default DataRow;
