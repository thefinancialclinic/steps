import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import DataRow from 'components/DataTable/DataRow';
import DataTable from 'components/DataTable/DataTable';
import { Flex } from 'grid-styled';
import React from 'react';

interface Props {
  name: string;
}

const OrganizationProfile: React.SFC<Props> = ({ name }) => (
  <Panel>
    <DataTable>
      <DataRow label="Name">{name}</DataRow>
    </DataTable>
    <Flex justifyContent="center">
      <Button>Edit</Button>
    </Flex>
  </Panel>
);

export default OrganizationProfile;
