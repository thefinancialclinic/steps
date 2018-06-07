import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Panel from 'atoms/Panel';
import Button from 'atoms/Buttons/Button';
import AdminNewStaff from './NewStaff';
import { StaffMember } from 'components/StaffList/types';
import StaffList from 'components/StaffList/StaffList';
import PageHeader from 'components/Headers/PageHeader';
import Main from 'atoms/Main';
import Label from 'atoms/Label';

interface Props {
  staff: StaffMember[];
}

export class Staff extends React.Component<Props, {}> {
  render() {
    return (
      <Main>
        <PageHeader label="Staff">
          <Link to="/admin/staff/new">
            <Button>Invite Staff</Button>
          </Link>
        </PageHeader>
        <Label>Name & Email</Label>
        <StaffList staff={this.props.staff} />
        <Switch>
          <Route path="/admin/staff/new" component={AdminNewStaff} />
        </Switch>
      </Main>
    );
  }
}

const mapStateToProps = ({ staff }) => ({
  staff,
});

export default connect(mapStateToProps)(Staff);
