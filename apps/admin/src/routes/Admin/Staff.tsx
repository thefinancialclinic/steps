import { addAlert } from 'actions/alerts';
import {
  deleteCoach,
  getCoaches,
  resendInvite,
  updatePermissions,
} from 'actions/staff';
import Button from 'atoms/Buttons/Button';
import Main from 'atoms/Main';
import { AlertLevel } from 'components/Alert/types';
import PageHeader from 'components/Headers/PageHeader';
import StaffList from 'components/StaffList/StaffList';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { User, USER_TYPE } from 'reducers/auth';
import { bindActionCreators } from 'redux';
import AdminNewStaff from './NewStaff';

interface Props {
  coaches: User[];
  actions: {
    getCoaches;
    addAlert;
    deleteCoach;
    resendInvite;
    updatePermissions;
  };
}

export class Staff extends React.Component<Props> {
  componentWillMount() {
    this.props.actions.getCoaches().catch(err => {
      this.props.actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'get-coaches-error',
      });
    });
  }

  onDelete = (coach: User) => {
    this.props.actions.deleteCoach(coach.id).catch(err => {
      this.props.actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'delete-coach-error',
      });
    });
    // TODO: This only works for coaches with an ID (not invited coaches). We can change this to use an email, or give invited coaches an ID.
  };

  onResend = (coach: User) => {
    this.props.actions.resendInvite(coach.email).catch(err => {
      this.props.actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'resend-invite-error',
      });
    });
  };

  onUpdateRole = (role: USER_TYPE, coach: User) => {
    this.props.actions.updatePermissions(coach.id, role).catch(err => {
      this.props.actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'update-permissions-error',
      });
    });
  };

  render() {
    return (
      <Main>
        <PageHeader label="Staff">
          <Link to="/staff/new">
            <Button>Invite Staff</Button>
          </Link>
        </PageHeader>
        <StaffList
          onDelete={this.onDelete}
          onResend={this.onResend}
          onUpdateRole={this.onUpdateRole}
          staff={this.props.coaches}
        />
        <Switch>
          <Route path="/staff/new" component={AdminNewStaff} />
        </Switch>
      </Main>
    );
  }
}

const mapStateToProps = ({ staff }) => ({
  coaches: staff.coaches,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { getCoaches, addAlert, deleteCoach, resendInvite, updatePermissions },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Staff);
