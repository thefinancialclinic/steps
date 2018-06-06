import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Panel from 'atoms/Panel';
import InputRow from 'components/Forms/InputRow';
import Button from 'atoms/Button';
import ButtonLink from 'atoms/ButtonLink';
import AdminNewStaff from './NewStaff';
import { StaffMember } from 'components/StaffList/types';
import StaffList from 'components/StaffList/StaffList';

interface Props {
  staff: StaffMember[];
}

export class Staff extends React.Component<Props, {}> {
  render() {
    return (
      <BaseStaff>
        <Header>
          <h1>Staff</h1>
          <ButtonLink to="/admin/staff/new">Invite Staff</ButtonLink>
        </Header>
        <Label>Name & Email</Label>
        <StaffList staff={this.props.staff} />
        <Switch>
          <Route path="/admin/staff/new" component={AdminNewStaff} />
        </Switch>
      </BaseStaff>
    );
  }
}
const BaseStaff = styled.div`
  flex: 2;
  margin-left: 100px;
  margin-right: 100px;
`;

const Header = styled.div`
  display: flex;
  font-size: 16px;
  align-items: baseline;
  justify-content: space-between;
`;

const Label = styled.label`
  text-transform: uppercase;
`;

const mapStateToProps = ({ staff }) => ({
  staff,
});

export default connect(mapStateToProps)(Staff);
