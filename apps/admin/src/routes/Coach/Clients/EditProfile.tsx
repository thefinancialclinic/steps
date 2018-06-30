import { addAlert } from 'actions/alerts';
import { updateClient, UPDATE_CLIENT } from 'actions/clients';
import { hideModal } from 'actions/modals';
import { AlertLevel } from 'components/Alert/types';
import EditClientProfileForm from 'forms/EditClientProfileForm';
import React from 'react';
import { connect } from 'react-redux';
import { User } from 'reducers/auth';
import { bindActionCreators } from 'redux';

export const EDIT_PROFILE = 'EDIT_PROFILE';

interface Props {
  client: User;
  actions: { updateClient; addAlert; hideModal };
}

class EditProfile extends React.Component<Props> {
  onSubmit = async (client: User) => {
    const { actions } = this.props;
    try {
      await actions.updateClient(client);
      await actions.addAlert({
        level: AlertLevel.Success,
        message: 'Successfully updated client',
        id: 'update-client-success',
      });
    } catch (err) {
      actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'update-client-error',
      });
    } finally {
      actions.hideModal(UPDATE_CLIENT);
    }
  };

  render() {
    return (
      <div>
        <h2>Edit Profile</h2>
        <EditClientProfileForm
          onSubmit={this.onSubmit}
          client={this.props.client}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addAlert, updateClient, hideModal }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(EditProfile);
