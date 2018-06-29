import React from 'react';
import IconButton from './IconButton';

interface Props {
  component?: string;
  onClick?(): void;
}

const EditButton: React.SFC<Props> = ({ component, onClick }) => (
  <IconButton iconName="edit" onClick={onClick}>
    Edit{component ? ` ${component}` : ''}
  </IconButton>
);

export default EditButton;
