import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import DataRow from 'components/DataTable/DataRow';
import DataTable from 'components/DataTable/DataTable';
import { Flex } from 'grid-styled';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
}

const OrganizationProfile: React.SFC<Props> = ({ name }) => (
  <Panel>
    <DataTable>
      <DataRow label="Name">{name}</DataRow>
    </DataTable>
    <Flex justifyContent="center">
      <Link to="/organization/edit">
        <Button>Edit</Button>
      </Link>
    </Flex>
  </Panel>
);

export default OrganizationProfile;
