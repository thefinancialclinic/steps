import * as React from 'react';
import styled from 'styled-components';
import { remCalc } from 'styles/type';
import Button from 'atoms/Buttons/Button';
import { Form, Field } from 'react-final-form';

interface Props {
  onSubmit(data): void;
}

export const NewStaffForm = ({ onSubmit }: Props) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <h1>Invite Staff</h1>
          <p>
            Enter the emails of the people you would like to invite, use commas
            to invite multiple people.
          </p>
          <BaseInputRow>
            <label htmlFor="emails">Emails</label>
            <Field name="emails" component="textarea" />
          </BaseInputRow>
          <Button>Save</Button>
        </form>
      )}
    />
  );
};

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

export default NewStaffForm;
