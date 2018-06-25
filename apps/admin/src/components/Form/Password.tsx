import Label from 'atoms/Label';
import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';
import { remCalc } from 'styles/type';

interface Props {
  label?: string;
  name: string;
  autoComplete?: string;
}

const Password: React.SFC<Props> = ({ label, name, autoComplete }) => (
  <BaseInput>
    {label && <Label htmlFor={name}>{label}</Label>}
    <Field
      name={name}
      render={({ input, meta }) => <input type="password" {...input} />}
      autoComplete={autoComplete}
    />
  </BaseInput>
);

const BaseInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${remCalc(20)};

  input {
    font-size: ${remCalc(18)};
    padding-bottom: ${remCalc(21)};
    padding-left: ${remCalc(20)};
    padding-right: ${remCalc(20)};
    padding-top: ${remCalc(21)};
    width: 100%;
  }
`;

export default Password;
