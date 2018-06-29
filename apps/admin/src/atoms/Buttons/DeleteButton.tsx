import React from 'react';
import IconButton from './IconButton';

interface Props {
  component?: string;
  onClick?(): void;
}

const DeleteButton: React.SFC<Props> = ({ component, onClick }) => (
  <IconButton iconName="delete" onClick={onClick}>
    Delete{component ? ` ${component}` : ''}
  </IconButton>
);

export default DeleteButton;
