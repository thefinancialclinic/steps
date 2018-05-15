import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { blue, green, lightBlue, mediumBlue, white } from 'styles/colors';

interface Props {
  label: string;
  name: string;
}

class InputRow extends React.Component<Props, {}> {
  render() {
    const { label, name } = this.props;
    return (
      <BaseInputRow>
        <label>{label}</label>
        <input name={name} />
      </BaseInputRow>
    );
  }
}

const BaseInputRow = styled.div`
  border-bottom: 1px solid ${mediumBlue};
  display: flex;
  padding-top: 30px;
  padding-bottom: 30px;

  label {
    display: inline-block;
    width: 20%;
  }
`;

export default InputRow;
