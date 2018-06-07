import React from 'react';
import styled from 'styled-components';

import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import { remCalc } from 'styles/type';
import Button from 'atoms/Button';

const BaseInputRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${remCalc(20)};

  label {
    margin-bottom: ${remCalc(5)};
    text-transform: uppercase;
  }

  input {
    font-size: ${remCalc(18)};
    padding-bottom: ${remCalc(21)};
    padding-left: ${remCalc(20)};
    padding-right: ${remCalc(20)};
    padding-top: ${remCalc(21)};
    width: 100%;
  }
`;

let NewClientForm = props => {
  const { handleSubmit, onSubmit } = props;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add New Client</h2>

      <Flex flexWrap="wrap">
        <Box width={[1, 1 / 2]} px={2}>
          <BaseInputRow>
            <label>First</label>
            <Field
              component="input"
              type="text"
              name="first_name"
              autoComplete="given-name"
            />
          </BaseInputRow>
        </Box>
        <Box width={[1, 1 / 2]} px={2}>
          <BaseInputRow>
            <label>Last</label>
            <Field
              component="input"
              type="text"
              name="last_name"
              autoComplete="family-name"
            />
          </BaseInputRow>
        </Box>
        <Box w={1} px={2}>
          <BaseInputRow>
            <label>Email</label>
            <Field
              component="input"
              type="email"
              name="email"
              autoComplete="email"
            />
          </BaseInputRow>
        </Box>
        <Box w={1} px={2}>
          <BaseInputRow>
            <label>Phone Number</label>
            <Field
              component="input"
              type="tel"
              name="phone"
              autoComplete="tel"
            />
          </BaseInputRow>
        </Box>
      </Flex>
      <Button>Save</Button>
    </form>
  );
};

NewClientForm = reduxForm({
  form: 'new-client',
})(NewClientForm);

export default NewClientForm;
