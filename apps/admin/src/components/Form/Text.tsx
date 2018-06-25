import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';
import { remCalc } from 'styles/type';
import { mediumBlue, red } from 'styles/colors';
import Label from 'atoms/Label';

export interface Props {
  label?: string;
  name: string;
  autoComplete?: string;
  grey?: boolean;
  inputType?: string;
  validate?: (value: any) => string;
}

const Text: React.SFC<Props> = ({
  label,
  name,
  autoComplete,
  validate,
  inputType,
  ...rest
}) => (
  <BaseInput>
    <Field name={name} autoComplete={autoComplete} validate={validate}>
      {({ input, meta }) => (
        <InputWrapper meta={meta}>
          {label && (
            <Label htmlFor={name} {...rest}>
              {label}
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </Label>
          )}
          <input {...input} type={inputType} />
        </InputWrapper>
      )}
    </Field>
  </BaseInput>
);

Text.defaultProps = {
  inputType: 'text',
};

const BaseInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${remCalc(20)};
`;

const InputWrapper = styled<any, 'div'>('div')`
  position: relative;
  input {
    border-radius: 4px;
    border: none;
    box-shadow: 0 0 0 1px
      ${props => (props.meta.invalid && props.meta.touched ? red : mediumBlue)};
    font-size: ${remCalc(18)};
    padding-bottom: ${remCalc(21)};
    padding-left: ${remCalc(20)};
    padding-right: ${remCalc(20)};
    padding-top: ${remCalc(21)};
  }
  span {
    position: absolute;
    right: 1em;
    color: ${red};
    font-size: ${remCalc(14)};
    text-transform: uppercase;
    margin-bottom: ${remCalc(10)};
  }
`;

export default Text;
