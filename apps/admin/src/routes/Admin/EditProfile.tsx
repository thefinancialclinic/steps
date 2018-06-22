import EditProfileForm from 'forms/EditProfileForm';
import { Box } from 'grid-styled';
import React from 'react';
import { User } from 'reducers/auth';
import { History } from 'react-router';
import { AlertLevel } from 'components/Alert/types';
import { bindActionCreators } from 'redux';
import { updateUser } from 'actions/auth';
import { addAlert } from 'actions/alerts';
import { connect } from 'react-redux';

interface Props {
  user: User;
  actions: { updateUser; addAlert };
  history: History;
}

export class EditProfile extends React.Component<Props> {
  onSubmit = updatedUser => {
    this.props.actions
      .updateUser(updatedUser)
      .then(() => {
        this.props.history.push('/profile');
        this.props.actions.addAlert({
          id: 'update-user-success',
          level: AlertLevel.Success,
          message: 'Successfully updated user',
        });
      })
      .catch(err => {
        this.props.actions.addAlert({
          id: 'update-user-error',
          level: AlertLevel.Error,
          message: err.message,
        });
      });
  };

  render() {
    const { user } = this.props;
    return (
      <Box width={1} p={4}>
        <EditProfileForm user={user} onSubmit={this.onSubmit} />
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ updateUser, addAlert }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(EditProfile);
