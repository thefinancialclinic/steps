import Button from 'atoms/Buttons/Button';
import Text from 'components/Form/Text';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { Form } from 'react-final-form';
import { User } from 'reducers/auth';

interface Props {
  onSubmit(data: User): void;
  client: User;
}

const EditClientProfileForm: React.SFC<Props> = ({ onSubmit, client }) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={client}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Flex>
            <Box width={[1 / 2]} mr={2}>
              <Text name="first_name" label="first" />
            </Box>
            <Box width={[1 / 2]}>
              <Text name="last_name" label="last" />
            </Box>
          </Flex>
          <Text name="email" label="email" />
          <Text name="phone" label="phone" />
          <Flex justifyContent="center">
            <Button>Save</Button>
          </Flex>
        </form>
      )}
    />
  );
};

export default EditClientProfileForm;
