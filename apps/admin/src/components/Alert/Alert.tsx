import styled from 'styled-components';
import * as React from 'react';
import { AlertLevel } from './types';
import { red, white, yellow, blue, green } from 'styles/colors';
import { Flex } from 'grid-styled';

export interface Props {
  level: AlertLevel;
  onClose(event): void;
}

export const Alert = ({ level, children, onClose }) => {
  return (
    <StyledAlert level={level}>
      <Flex justifyContent="space-between" alignItems="center">
        {children}
        <CloseIcon className="material-icons" onClick={onClose}>
          clear
        </CloseIcon>
      </Flex>
    </StyledAlert>
  );
};

const alertColor = (level: AlertLevel): string => {
  switch (level) {
    case AlertLevel.Warning:
      return yellow;
    case AlertLevel.Info:
      return blue;
    case AlertLevel.Success:
      return green;
    default:
      return red;
  }
};

// change style based on level
const StyledAlert = styled<{ level: AlertLevel }, 'div'>('div')`
  background-color: ${({ level }) => alertColor(level)};
  color: ${white};
  padding: 0.75rem;
  position: relative;
  z-index: 9999;
`;

export const CloseIcon = styled.i`
  cursor: pointer;
`;

export default Alert;
