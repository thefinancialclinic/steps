import React from 'react';
import { Field } from 'react-final-form';
import styled from 'styled-components';
import { remCalc } from 'styles/type';
import { mediumBlue, red } from 'styles/colors';
import Label from 'atoms/Label';
import { Flex } from 'grid-styled';

export interface Props {
  label?: string;
  name: string;
  validate?: (value: any) => string;
}

const Text: React.SFC<Props> = ({ label, name, validate, ...rest }) => (
  <BaseInput>
    <Field name={name} validate={validate} type="checkbox">
      {({ input, meta }) => (
        <InputWrapper meta={meta}>
          <Flex flexDirection="row">
            <input {...input} type="checkbox" />
            {label && (
              <Label htmlFor={name} {...rest}>
                {label}
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </Label>
            )}
          </Flex>
        </InputWrapper>
      )}
    </Field>
  </BaseInput>
);

const BaseInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${remCalc(20)};
  margin-left: 10px;
`;

const InputWrapper = styled<any, 'div'>('div')`
  position: relative;
  line-height: 21px;
  input {
    vertical-align: bottom;
    transform: scale(1.5);
    border-radius: 4px;
    border: none;
    font-size: ${remCalc(18)};
    padding-bottom: ${remCalc(21)};
    padding-left: ${remCalc(20)};
    padding-right: ${remCalc(20)};
    padding-top: ${remCalc(21)};
  }
  label {
    margin-left: ${remCalc(10)};
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
