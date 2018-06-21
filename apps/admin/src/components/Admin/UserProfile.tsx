import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import { Flex } from 'grid-styled';
import React from 'react';
import DataRow from 'components/DataTable/DataRow';
import DataTable from 'components/DataTable/DataTable';
import { Link } from 'react-router-dom';

interface Props {
  firstName: string;
  lastName: string;
  email: string;
}

const UserProfile: React.SFC<Props> = ({ firstName, lastName, email }) => (
  <Panel>
    <DataTable>
      <DataRow label="first name">{firstName}</DataRow>
      <DataRow label="last name">{lastName}</DataRow>
      <DataRow label="email">{email}</DataRow>
    </DataTable>
    <Flex justifyContent="center">
      <Link to="/profile/edit">
        <Button>Edit</Button>
      </Link>
    </Flex>
  </Panel>
);

export default UserProfile;
