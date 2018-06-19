import React from 'react';
import styled, { css } from 'styled-components';

import { remCalc } from 'styles/type';
import { black, mediumBlue, white } from 'styles/colors';

enum INPUT_TYPE {
  email = 'email',
  number = 'number',
  password = 'password',
  text = 'text',
  textarea = 'textarea',
}

interface Props {
  rounded?: boolean;
  type?: INPUT_TYPE.email | INPUT_TYPE.number | INPUT_TYPE.password | INPUT_TYPE.text | INPUT_TYPE.textarea;
  name?: string;
  defaultValue?: string;
}

const Input: React.SFC<Props> = ({
  defaultValue,
  rounded = false,
  type = INPUT_TYPE.text,
  name,
}) => {
  const InputWrapper = rounded ? RoundInputWrapper : BaseInputWrapper;

  let input;
  if (type === INPUT_TYPE.textarea)
    input = <Textarea name={name} defaultValue={defaultValue} />;
  else input = <BaseInput type={type} defaultValue={defaultValue} />;

  return <InputWrapper>{input}</InputWrapper>;
};
// TODO: Add file input upload button

const baseStyle = css`
  border: none;
  background: none;
  box-shadow: none;
  font-size: ${remCalc(18)};
  padding-bottom: ${remCalc(21)};
  padding-left: ${remCalc(20)};
  padding-right: ${remCalc(20)};
  padding-top: ${remCalc(21)};
  width: 100%;
`;

const Textarea = styled.textarea`
  resize: none;
  ${baseStyle};
`;

const BaseInput = styled.input`
  ${baseStyle};
`;

const BaseInputWrapper = styled.div`
  background-color: ${white};
  box-shadow: 0 0 0 1px ${mediumBlue};
  border: none;
  border-radius: 4px;
  color: ${black};
  display: inline-block;
  min-width: 180px;
`;

const RoundInputWrapper = BaseInputWrapper.extend`
  border-radius: 1000px;
`;

export default Input;
