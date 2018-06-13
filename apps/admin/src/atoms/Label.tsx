import React from 'react';
import styled from 'styled-components';
import { remCalc } from 'styles/type';

interface Props {
  htmlFor?: string;
}

const Label: React.SFC<Props> = ({ htmlFor, children }) => (
  <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
);

const StyledLabel = styled.label`
  text-transform: uppercase;
  margin-bottom: ${remCalc(5)};
`;

export default Label;
