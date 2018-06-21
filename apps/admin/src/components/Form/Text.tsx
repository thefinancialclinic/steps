import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';
import { remCalc } from 'styles/type';
import { mediumBlue } from 'styles/colors';
import Label from 'atoms/Label';

interface Props {
  label?: string;
  name: string;
  autoComplete?: string;
  grey?: boolean;
}

const Text: React.SFC<Props> = ({ label, name, autoComplete, ...rest }) => (
  <BaseInput>
    {label && <Label htmlFor={name} {...rest}>{label}</Label>}
    <Field name={name} component="input" autoComplete={autoComplete} />
  </BaseInput>
);

const BaseInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${remCalc(20)};

  input {
    border-radius: 4px;
    border: none;
    box-shadow: 0 0 0 1px ${mediumBlue};
    font-size: ${remCalc(18)};
    padding-bottom: ${remCalc(21)};
    padding-left: ${remCalc(20)};
    padding-right: ${remCalc(20)};
    padding-top: ${remCalc(21)};
    width: 100%;
  }
`;

export default Text;
