import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import { Flex } from 'grid-styled';
import React from 'react';
import DataRow from 'components/DataTable/DataRow';
import DataTable from 'components/DataTable/DataTable';

interface Props {
  name: string;
  email: string;
}

const UserProfile: React.SFC<Props> = ({ name, email }) => (
  <Panel>
    <DataTable>
      <DataRow label="name">{name}</DataRow>
      <DataRow label="email">{email}</DataRow>
    </DataTable>
    <Flex justifyContent="center">
      <Button>Edit</Button>
    </Flex>
  </Panel>
);

export default UserProfile;
