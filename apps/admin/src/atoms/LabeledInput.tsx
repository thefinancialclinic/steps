import React from 'react';
import styled from 'styled-components';

import Input from './Input';
import {
  black,
  mediumBlue,
  white,
} from 'styles/colors';

interface Props {
  text?: string;
  type?: string
}

class LabeledInput extends React.Component<Props, {}> {

  render() {
    const { text, type } = this.props;
    return (
      <BaseLabeledInput>
        <label>{text}</label>
        <Input type={type} />
      </BaseLabeledInput>
    );
  }
}

const BaseLabeledInput = styled.div`
  label {
    display: block;
    margin: .5em 0 .25em 0;
    text-transform: uppercase;
  }

`;

export default LabeledInput;
