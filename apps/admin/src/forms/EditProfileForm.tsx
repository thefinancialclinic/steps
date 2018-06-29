import React from 'react';
import { Form, Field } from 'react-final-form';
import { User } from 'reducers/auth';
import Panel from 'atoms/Panel';
import DataTable from 'components/DataTable/DataTable';
import DataRow from 'components/DataTable/DataRow';
import { Flex } from 'grid-styled';
import Button from 'atoms/Buttons/Button';

interface Props {
  onSubmit(data: Partial<User>);
  user: User;
}

const EditProfileForm: React.SFC<Props> = ({ onSubmit, user }) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={user}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Panel>
            <DataTable>
              <DataRow label="first name">
                <Field
                  component="input"
                  name="first_name"
                  value={user.first_name}
                />
              </DataRow>
              <DataRow label="last name">
                <Field
                  component="input"
                  name="last_name"
                  value={user.last_name}
                />
              </DataRow>
              <DataRow label="email">
                <Field component="input" name="email" value={user.email} />
              </DataRow>
            </DataTable>
            <Flex justifyContent="center">
              <Button>Save</Button>
            </Flex>
          </Panel>
        </form>
      )}
    />
  );
};

export default EditProfileForm;
