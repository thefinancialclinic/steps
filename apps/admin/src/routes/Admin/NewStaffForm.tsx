import * as React from 'react';
import styled from 'styled-components';
import { remCalc } from 'styles/type';
import { reduxForm } from 'redux-form';
import Button from 'atoms/Button';

const BaseInputRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${remCalc(20)};

  label {
    margin-bottom: ${remCalc(5)};
    text-transform: uppercase;
  }

  textarea {
    font-size: ${remCalc(18)};
    padding-bottom: ${remCalc(21)};
    padding-left: ${remCalc(20)};
    padding-right: ${remCalc(20)};
    padding-top: ${remCalc(21)};
    width: 100%;
  }
`;

interface Props {
  onSubmit(data): void;
}

export const NewStaffForm = ({ onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <BaseInputRow>
        <label htmlFor="emails">Emails</label>
        <textarea name="emails" cols={30} rows={10} />
      </BaseInputRow>
      <Button>Save</Button>
    </form>
  );
};

export default NewStaffForm;
