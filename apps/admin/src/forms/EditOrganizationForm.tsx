import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import DataRow from 'components/DataTable/DataRow';
import DataTable from 'components/DataTable/DataTable';
import { Flex } from 'grid-styled';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { Org } from 'reducers/auth';

interface Props {
  onSubmit(data: Partial<Org>);
  organization: Org;
}

const EditOrganizationForm: React.SFC<Props> = ({ onSubmit, organization }) => {
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={organization}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Panel>
            <DataTable>
              <DataRow label="name">
                <Field
                  component="input"
                  name="name"
                  value={organization.name}
                />
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

export default EditOrganizationForm;
