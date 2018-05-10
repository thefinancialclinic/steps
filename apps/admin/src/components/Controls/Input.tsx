import React from 'react';
import styled from 'styled-components';

import {
  black,
  mediumBlue,
  white,
} from 'styles/colors';

interface Props {
  rounded?: boolean;
}

class Input extends React.Component<Props, {}> {
  static defaultProps = { rounded: false };

  render() {
    const InputEl = this.props.rounded ? RoundInput : BaseInput;
    return (
      <InputEl>
        <input />
      </InputEl>
    );
  }
}

const BaseInput = styled.div`
  background-color: ${white};
  box-shadow: 0 0 0 1px ${mediumBlue};
  border: none;
  color: ${black};
  display: inline-block;
  font-size: 0.825em;
  min-width: 180px;
  margin: 20px;

  input {
    border: none;
    background: none;
    box-shadow: none;
    padding-bottom: 1.5em;
    padding-left: 2.25em;
    padding-right: 2.25em;
    padding-top: 1.5em;
  }
`;

const RoundInput = BaseInput.extend`
  border-radius: 1000px;
`;

export default Input;
