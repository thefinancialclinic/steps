import React from 'react';
import styled from 'styled-components';
import { remCalc } from 'styles/type';
import { black, grey } from 'styles/colors';

interface Props {
  htmlFor?: string;
  grey?: boolean;
}

const Label: React.SFC<Props> = ({ htmlFor, children, ...rest}) => (
  <StyledLabel htmlFor={htmlFor} {...rest}>{children}</StyledLabel>
);

const StyledLabel = styled<Props, 'label'>('label')`
  color: ${props => props.grey ? grey : black};
  font-size: ${remCalc(14)};
  text-transform: uppercase;
  margin-bottom: ${remCalc(10)};
`;

export default Label;
