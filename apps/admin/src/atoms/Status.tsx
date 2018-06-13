import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  color: string;
}

const Status: React.SFC<Props> = ({ children, color }) => (
  <StyledStatus color={color}>{children}</StyledStatus>
);

const StyledStatus = styled<Props, 'div'>('div')`
  font-size: 16px;
  text-transform: uppercase;
  color: ${({ color }) => color};
`;

export default Status;
