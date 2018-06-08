import Button from 'atoms/Buttons/Button';
import Textarea from 'components/Form/Textarea';
import { Flex } from 'grid-styled';
import * as React from 'react';
import { Form } from 'react-final-form';
import styled from 'styled-components';
import { remCalc } from 'styles/type';

interface Props {
  onSubmit(data): void;
}

export const NewStaffForm = ({ onSubmit }: Props) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Flex justifyContent="center">
            <h1>Invite Staff</h1>
          </Flex>
          <p>
            Enter the emails of the people you would like to invite, use commas
            to invite multiple people.
          </p>
          <BaseInputRow>
            <Textarea label="Emails" name="emails" />
          </BaseInputRow>
          <Flex justifyContent="center">
            <Button>Save</Button>
          </Flex>
        </StyledForm>
      )}
    />
  );
};

const StyledForm = styled.form`
  width: ${remCalc(520)};
`;

const BaseInputRow = styled.div`
  textarea {
    margin-bottom: ${remCalc(20)};
    margin-top: ${remCalc(5)};
  }
`;

export default NewStaffForm;
