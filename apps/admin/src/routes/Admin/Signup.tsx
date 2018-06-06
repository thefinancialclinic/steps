import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';

import { remCalc } from 'styles/type';
import { grey } from 'styles/colors';
import Main from 'atoms/Main';
import Subtext from 'atoms/Subtext';
import Centered from 'helpers/Centered';
import DataTable from 'components/DataTable/DataTable';
import DataRow from 'components/DataTable/DataRow';
import Input from 'atoms/Input/Input';
import SectionHeader from 'components/Headers/SectionHeader';

interface Props {
  className?: string;
}

class Signup extends React.Component<Props, {}> {
  render() {
    return (
      <Main>
        <Panel className="right">
        <SectionHeader label="Sign Up">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vero
            qui totam consequatur deserunt harum tempora mollitia quam? Esse
            corrupti mollitia aspernatur aperiam adipisci doloremque ea libero
            praesentium, in fuga?
          </p>
        </SectionHeader>
          <h2>Sign Up</h2>
          <Subtext>
          </Subtext>
          <DataTable>
            <DataRow label="First">
              <Input />
            </DataRow>
            <DataRow label="Last">
              <Input />
            </DataRow>
            <DataRow label="Organization's Name">
              <Input />
            </DataRow>
            <DataRow label="Email">
              <Input />
            </DataRow>
            <DataRow label="Password">
              <Input type="password" />
            </DataRow>
          </DataTable>
          <Centered>
            <Link to="/admin/profile">
              <Button>Sign Up</Button>
            </Link>
          </Centered>
        </Panel>
      </Main>
    );
  }
}

const Right = styled(Panel)`
  border-radius: 0;
  display: table-cell;
  min-height: 100%;
  padding: 30px;
  width: 400px;
`;

const StyledSignup = styled(Signup)`
  display: table;
  min-height: 100%;

  .right {
  }
`;

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledSignup);
