import Button from 'atoms/Buttons/Button';
import Label from 'atoms/Label';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';
import { remCalc } from 'styles/type';

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

interface Props {
  onSubmit: (any) => void;
}

class NewClientForm extends React.Component<Props> {
  render() {
    return (
      <Form
        onSubmit={this.props.onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2>Add New Client</h2>
            <Flex flexWrap="wrap">
              <Box width={[1, 1 / 2]} px={2}>
                <BaseInputRow>
                  <Label>First</Label>
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
                  <Label>Last</Label>
                  <Field
                    component="input"
                    type="text"
                    name="last_name"
                    autoComplete="family-name"
                  />
                </BaseInputRow>
              </Box>
              <Box width={1} px={2}>
                <BaseInputRow>
                  <Label>Email</Label>
                  <Field
                    component="input"
                    type="email"
                    name="email"
                    autoComplete="email"
                  />
                </BaseInputRow>
              </Box>
              <Box width={1} px={2}>
                <BaseInputRow>
                  <Label>Phone Number</Label>
                  <Field
                    component="input"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                  />
                </BaseInputRow>
              </Box>
            </Flex>
            <Button type="submit">Save</Button>
          </form>
        )}
      />
    );
  }
}

export default NewClientForm;
