import React from 'react';
import styled from 'styled-components';
import { sansSerif, serif, remCalc } from 'styles/type';
import { black, grey } from 'styles/colors';

interface Props {
  htmlFor?: string;
  grey?: boolean;
  type?: string;
}

const Label: React.SFC<Props> = ({ htmlFor, children, ...rest }) => (
  <StyledLabel htmlFor={htmlFor} {...rest}>
    {children}
  </StyledLabel>
);

const StyledLabel = styled<Props, 'label'>('label')`
  color: ${props => (props.grey ? grey : black)};
  font-family: ${props => (props.type === 'checkbox' ? serif : sansSerif)};
  font-size: ${props =>
    props.type === 'checkbox' ? remCalc(21) : remCalc(14)};
  text-transform: ${props =>
    props.type === 'checkbox' ? 'none' : 'uppercase'};
  margin-right: ${remCalc(10)};
  margin-bottom: ${remCalc(10)};
`;

export default Label;
