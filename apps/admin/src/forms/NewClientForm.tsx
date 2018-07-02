import Button from 'atoms/Buttons/Button';
import Text from 'components/Form/Text';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { Form } from 'react-final-form';
import Checkbox from 'components/Form/Checkbox';
import styled from 'styled-components';
import { serif } from 'styles/type';

let NewClientForm = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Add New Client</h2>
        <Flex flexWrap="wrap">
          <Box width={[1, 1 / 2]} px={2}>
            <Text name="first_name" label="First" autoComplete="given-name" />
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Text name="last_name" label="Last" autoComplete="family-name" />
          </Box>
          <Box width={1} px={2}>
            <Text name="email" label="Email" autoComplete="email" />
          </Box>
          <Box width={1} px={2}>
            <Text name="phone" label="Phone Number" autoComplete="tel" />
          </Box>
          <Box width={1}>
            <StyledCheckbox
              name="has_messenger"
              label="Do you have and use Facebook Messenger?"
            />
          </Box>
        </Flex>
        <Button>Save</Button>
      </form>
    )}
  />
);

const StyledCheckbox = styled(Checkbox)`
  font-family: ${serif};
  font-size: 21px;
  text-transform: none;
  line-height: 21px;
`;

export default NewClientForm;
