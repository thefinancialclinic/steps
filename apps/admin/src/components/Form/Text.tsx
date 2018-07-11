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
    <Field
      name={name}
      autoComplete={autoComplete}
      validate={validate}
      type={inputType}
    >
      {({ input, meta }) => (
        <InputWrapper>
          <Flex
            flexDirection={inputType === 'checkbox' ? 'row-reverse' : 'column'}
            justifyContent="flex-end"
            alignItems={inputType === 'checkbox' ? 'center' : 'stretch'}
          >
            {label && (
              <Label htmlFor={name} {...rest} type={inputType}>
                {label}
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </Label>
            )}
            <InputStyles {...input} id={name} type={inputType} meta={meta} />
          </Flex>
        </InputWrapper>
      )}
    </Field>
  </BaseInput>
);

Text.defaultProps = {
  inputType: 'text',
};

const InputStyles = styled<any, 'input'>('input')`
  border-radius: 4px;
  border: none;
  box-shadow: 0 0 0 1px
    ${props => (props.meta.invalid && props.meta.touched ? red : mediumBlue)};
  font-size: ${remCalc(18)};
  max-width: 100%;
  padding-bottom: ${remCalc(21)};
  padding-left: ${remCalc(20)};
  padding-right: ${remCalc(20)};
  padding-top: ${remCalc(21)};
  margin-bottom: ${props => (props.type === 'checkbox' ? remCalc(10) : 0)};
  margin-right: ${props => (props.type === 'checkbox' ? remCalc(10) : 0)};
`;

const BaseInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${remCalc(20)};
`;

const InputWrapper = styled<any, 'div'>('div')`
  position: relative;
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
