import { addAlert } from 'actions/alerts';
import { updateClient } from 'actions/clients';
import { AlertLevel } from 'components/Alert/types';
import EditProfileModal from 'components/Clients/EditProfileModal';
import { findById } from 'helpers';
import React from 'react';
import { connect } from 'react-redux';
import { User } from 'reducers/auth';
import { bindActionCreators } from 'redux';

interface Props {
  client: User;
  actions: { updateClient; addAlert };
}

class EditProfile extends React.Component<Props> {
  onSubmit = (client: User) => {
    const { actions } = this.props;
    actions
      .updateClient(client)
      .then(() => {
        actions.addAlert({
          level: AlertLevel.Success,
          message: 'Successfully updated client',
          id: 'update-client-success',
        });
      })
      .catch(err => {
        actions.addAlert({
          level: AlertLevel.Error,
          message: err.message,
          id: 'update-client-error',
        });
      });
  };

  render() {
    return (
      <EditProfileModal client={this.props.client} onSubmit={this.onSubmit} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  client: findById(state.clients.clients, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addAlert, updateClient }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile);
