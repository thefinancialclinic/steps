import styled from 'styled-components';
import React from 'react';
import { Flex } from 'grid-styled';
import { grey } from 'styles/colors';
import { remCalc } from 'styles/type';

interface Props {
  onClick?(): void;
  iconName: string;
}

const IconButton: React.SFC<Props> = ({ children, onClick, iconName }) => (
  <StyledButton alignItems="center" onClick={onClick}>
    <Icon className="material-icons">{iconName}</Icon>
    {children}
  </StyledButton>
);

const StyledButton = styled(Flex)`
  color: ${grey};
  cursor: pointer;
  font-size: ${remCalc(14)}
  text-transform: uppercase;
`;

const Icon = styled.i`
  font-size: ${remCalc(15)};
  margin-right: 2px;
`;

export default IconButton;
