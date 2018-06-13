import Label from 'atoms/Label';
import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';
import { white, mediumBlue } from 'styles/colors';
import { remCalc } from 'styles/type';

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  name: string;
}

const Textarea: React.SFC<Props> = ({ label, name, placeholder, value }) => (
  <BaseInput>
    {label && <Label htmlFor={name}>{label}</Label>}
    <Field
      name={name}
      component="textarea"
      placeholder={placeholder}
      value={value}
    />
  </BaseInput>
);

const BaseInput = styled.div`
  textarea {
    border-radius: 4px;
    background-color: ${white};
    border: solid 1px ${mediumBlue};
    font-size: ${remCalc(18)};
    padding-bottom: ${remCalc(21)};
    padding-left: ${remCalc(20)};
    padding-right: ${remCalc(20)};
    padding-top: ${remCalc(21)};
    width: 100%;
  }
`;

export default Textarea;
