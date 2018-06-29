import { addAlert } from 'actions/alerts';
import { hideModal } from 'actions/modals';
import { inviteStaff } from 'actions/staff';
import { Alert, AlertLevel } from 'components/Alert/types';
import NewStaffForm from 'forms/NewStaffForm';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

export const NEW_STAFF = 'NEW_STAFF';

interface Props {
  actions: { inviteStaff; addAlert: (alert: Alert) => void; hideModal };
}

export class NewStaff extends React.Component<Props> {
  createStaff = ({ emails }) => {
    const { actions } = this.props;
    const splitEmails = emails.split(/,\s*/);
    actions
      .inviteStaff(splitEmails)
      .catch(err => {
        actions.addAlert({
          message: err.message,
          level: AlertLevel.Error,
          id: 'new-staff-error',
        });
        actions.hideModal(NEW_STAFF);
      })
      .then(() => {
        actions.hideModal(NEW_STAFF);
      });
  };

  render() {
    return <NewStaffForm onSubmit={this.createStaff} />;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ inviteStaff, addAlert, hideModal }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(NewStaff));
