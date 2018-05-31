import React from 'react';
import styled from 'styled-components';

import { remCalc } from 'styles/type';
import { black, mediumBlue, white } from 'styles/colors';

interface Props {
  rounded?: boolean;
  type?: string;
}

class Input extends React.Component<Props, {}> {
  static defaultProps = { rounded: false };

  render() {
    const InputEl = this.props.rounded ? RoundInput : BaseInput;
    const type = this.props.type;
    return (
      <InputEl>
        <input type={type} />
      </InputEl>
    );
  }
}

const BaseInput = styled.div`
  background-color: ${white};
  box-shadow: 0 0 0 1px ${mediumBlue};
  border: none;
  border-radius: 4px;
  color: ${black};
  display: inline-block;
  min-width: 180px;

  input {
    border: none;
    background: none;
    box-shadow: none;
    font-size: ${remCalc(18)};
    padding-bottom: ${remCalc(21)};
    padding-left: ${remCalc(20)};
    padding-right: ${remCalc(20)};
    padding-top: ${remCalc(21)};
    width: 100%;
  }
`;

const RoundInput = BaseInput.extend`
  border-radius: 1000px;
`;

export default Input;
