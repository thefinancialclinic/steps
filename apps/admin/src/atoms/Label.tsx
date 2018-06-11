import React from 'react';
import styled from 'styled-components';

interface Props {
  htmlFor?: string;
}

const Label: React.SFC<Props> = ({ htmlFor, children }) => (
  <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>
);

const StyledLabel = styled.label`
  text-transform: uppercase;
`;

export default Label;
