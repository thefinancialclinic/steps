import { addAlert } from 'actions/alerts';
import { getCoaches, deleteCoach } from 'actions/staff';
import Button from 'atoms/Buttons/Button';
import Label from 'atoms/Label';
import Main from 'atoms/Main';
import { AlertLevel } from 'components/Alert/types';
import PageHeader from 'components/Headers/PageHeader';
import StaffList from 'components/StaffList/StaffList';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import AdminNewStaff from './NewStaff';
import { User, USER_TYPE } from 'reducers/auth';

interface Props {
  coaches: User[];
  actions: { getCoaches; addAlert; deleteCoach };
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
    console.log(coach);
    this.props.actions.deleteCoach(coach.id).catch(err => {
      this.props.actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'delete-coach-error',
      });
    });
  };

  onResend = (coach: User) => {
    console.log('resending invite');
  };

  onUpdateRole = (role: USER_TYPE, coach: User) => {
    console.log('updating role');
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
  actions: bindActionCreators({ getCoaches, addAlert, deleteCoach }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Staff);
