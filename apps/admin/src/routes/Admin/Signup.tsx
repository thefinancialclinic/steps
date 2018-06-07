import Button from 'atoms/Buttons/Button';
import Input from 'atoms/Form/Input';
import Main from 'atoms/Main';
import Panel from 'atoms/Panel';
import Subtext from 'atoms/Subtext';
import DataRow from 'components/DataTable/DataRow';
import DataTable from 'components/DataTable/DataTable';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

interface Props {
  className?: string;
}

class Signup extends React.Component<Props, {}> {
  render() {
    return (
      <Main>
        <Panel className="right">
          <h2>Sign Up</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime vero
            qui totam consequatur deserunt harum tempora mollitia quam? Esse
            corrupti mollitia aspernatur aperiam adipisci doloremque ea libero
            praesentium, in fuga?
          </p>
          <h2>Sign Up</h2>
          <Subtext />
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
          <Flex justifyContent="center">
            <Link to="/admin/profile">
              <Button>Sign Up</Button>
            </Link>
          </Flex>
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
