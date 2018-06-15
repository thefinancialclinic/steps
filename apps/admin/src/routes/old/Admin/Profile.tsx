import Button from 'atoms/Buttons/Button';
import Main from 'atoms/Main';
import Panel from 'atoms/Panel';
import DataRow from 'components/DataTable/DataRow';
import DataTable from 'components/DataTable/DataTable';
import { Flex } from 'grid-styled';
import React from 'react';
import PhotoUpload from 'components/PhotoUpload';

interface Props {
  className?: string;
}

class Profile extends React.Component<Props, {}> {
  render() {
    return (
      <Main>
        <Panel>
          <DataTable>
            <DataRow label="profile picture">
              <PhotoUpload />
            </DataRow>
            <DataRow label="name">Jane Smith</DataRow>
            <DataRow label="email">jane@example.com</DataRow>
            <DataRow label="password">********</DataRow>
          </DataTable>
          <Flex justifyContent="center">
            <Button>Edit</Button>
          </Flex>
        </Panel>
      </Main>
    );
  }
}

export default Profile;
