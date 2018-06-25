import styled from 'styled-components';
import React from 'react';
import { Flex } from 'grid-styled';
import { grey } from 'styles/colors';
import { remCalc } from 'styles/type';
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
