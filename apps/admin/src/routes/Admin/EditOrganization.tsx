import { addAlert } from 'actions/alerts';
import { Box } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';
import { User } from 'reducers/auth';
import { bindActionCreators } from 'redux';
import EditOrganizationForm from 'forms/EditOrganizationForm';
import { AlertLevel } from 'components/Alert/types';
import { updateOrganization } from 'actions/auth';

interface Props {
  user: User;
  actions: { updateOrganization; addAlert };
  history: History;
}

export class EditOrganization extends React.Component<Props> {
  onSubmit = updatedOrganization => {
    this.props.actions
      .updateOrganization(updatedOrganization, this.props.user)
      .then(() => {
        this.props.history.push('/organization');
        this.props.actions.addAlert({
          id: 'update-org-success',
          level: AlertLevel.Success,
          message: 'Successfully updated organization',
        });
      })
      .catch(err => {
        this.props.actions.addAlert({
          id: 'update-org-error',
          level: AlertLevel.Error,
          message: err.message,
        });
      });
  };

  render() {
    const { user } = this.props;
    return (
      <Box width={1} p={4}>
        <EditOrganizationForm
          organization={user.org}
          onSubmit={this.onSubmit}
        />
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addAlert, updateOrganization }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(EditOrganization);
