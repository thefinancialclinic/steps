import { black } from 'styles/colors';
import styled from 'styled-components';
import React from 'react';

interface Props {
  onClick?(): void;
}

const Close: React.SFC<Props> = ({ onClick }) => (
  <StyledIcon className="material-icons close" onClick={onClick}>
    close
  </StyledIcon>
);

const StyledIcon = styled.i`
  color: ${black};
  font-size: 20px;
  cursor: pointer;
`;

export default Close;
