import React from 'react';
import TableCell from 'atoms/Table/TableCell';
import TableRow from 'atoms/Table/TableRow';
import Label from 'atoms/Label';

interface Props {
  label: string;
}

const DataRow: React.SFC<Props> = ({ label, children }) => (
  <TableRow>
    <TableCell>
      <Label>{label}</Label>
    </TableCell>
    <TableCell>{children}</TableCell>
  </TableRow>
);

export default DataRow;
