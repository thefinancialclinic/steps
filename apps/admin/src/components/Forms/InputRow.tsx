import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { blue, green, lightBlue, mediumBlue, white } from 'styles/colors';

interface Props {
  label: string;
  name?: string;
}

class InputRow extends React.Component<Props, {}> {
  render() {
    const { label, name } = this.props;
    const inputName = name || label.toLowerCase().replace(' ', '-');
    return (
      <BaseInputRow>
        <label>{label}</label>
        <input name={inputName} />
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
    text-transform: uppercase;
    width: 20%;
  }
`;

export default InputRow;
