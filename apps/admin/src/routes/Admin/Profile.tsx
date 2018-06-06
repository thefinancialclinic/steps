import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Panel from 'atoms/Panel';
import Button from 'atoms/Buttons/Button';
import Main from 'atoms/Main';
import DataTable from 'components/DataTable/DataTable';
import DataRow from 'components/DataTable/DataRow';
import Centered from 'helpers/Centered';

interface Props {
  className?: string;
}

class Profile extends React.Component<Props, {}> {
  render() {
    return (
      <Main>
        <Panel>
          <DataTable>
            <DataRow label="profile picture">Profile picture goes here</DataRow>
            <DataRow label="name">Jane Smith</DataRow>
            <DataRow label="email">jane@example.com</DataRow>
            <DataRow label="password">********</DataRow>
          </DataTable>
          <Centered>
            <Button>Edit</Button>
          </Centered>
        </Panel>
      </Main>
    );
  }
}

export default Profile;
