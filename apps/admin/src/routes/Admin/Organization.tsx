import Button from 'atoms/Buttons/Button';
import Main from 'atoms/Main';
import Panel from 'atoms/Panel';
import DataRow from 'components/DataTable/DataRow';
import DataTable from 'components/DataTable/DataTable';
import Centered from 'helpers/Centered';
import React from 'react';

class Organization extends React.Component<{}, {}> {
  render() {
    return (
      <Main>
        <Panel>
          <DataTable>
            <DataRow label="Organization Logo">Logo goes here</DataRow>
            <DataRow label="Name">Name goes here</DataRow>
          </DataTable>
          <Centered>
            <Button>Edit</Button>
          </Centered>
        </Panel>
      </Main>
    );
  }
}

export default Organization;
