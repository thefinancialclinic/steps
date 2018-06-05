import styled from 'styled-components';
import * as React from 'react';
import { AlertLevel } from './types';

export interface Props {
  level: AlertLevel;
}

export const Alert = ({ level, children }) => {
  return <StyledAlert level={level}>{children}</StyledAlert>;
};

// change style based on level
const StyledAlert = styled<Props, 'div'>('div')``;

export default Alert;
