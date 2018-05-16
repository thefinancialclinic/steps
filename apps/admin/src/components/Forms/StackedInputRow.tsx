import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Input from 'atoms/Input';
import { remCalc } from 'styles/type';
import { blue, green, lightBlue, mediumBlue, white } from 'styles/colors';

interface Props {
  label: string;
  name?: string;
}

class InputRow extends React.Component<Props, {}> {
  render() {
    const { label, name } = this.props;
    return (
      <BaseInputRow>
        <label>{label}</label>
        <Input />
      </BaseInputRow>
    );
  }
}

const BaseInputRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${remCalc(20)};

  label {
    margin-bottom: ${remCalc(5)};
    text-transform: uppercase;
  }
`;

export default InputRow;
