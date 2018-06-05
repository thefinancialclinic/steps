import * as React from 'react';
import Modal from '../../components/Modal';
import styled from 'styled-components';
import ButtonLink from 'atoms/ButtonLink';
import NewStaffForm from './NewStaffForm';
import { AlertLevel } from 'components/Alert/types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAlert } from 'actions/alerts';
import { inviteStaff } from 'actions/staff';
import { History } from 'react-router';
import { withRouter } from 'react-router-dom';

interface Props {
  actions: { inviteStaff; addAlert };
  history: History;
}

export class NewStaff extends React.Component<Props, {}> {
  createStaff = ({ emails }) => {
    const splitEmails = emails.split(/,\s*/);
    this.props.actions
      .inviteStaff(splitEmails)
      .then(res => {
        this.props.history.push('/admin/staff');
      })
      .catch(err => {
        this.props.actions.addAlert(err, AlertLevel.Error);
      });
  };

  render() {
    return (
      <StyledModal>
        <div>
          <h1>Invite Staff</h1>
          <p>
            Enter the emails of the people you would like to invite, use commas
            to invite multiple people.
          </p>
          <NewStaffForm onSubmit={this.createStaff} />
        </div>
      </StyledModal>
    );
  }
}

const StyledModal = styled(Modal)`
  div {
    position: relative;
    min-width: 400px;
    max-width: 840px;
    margin: auto;
  }
  margin: auto;
`;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ inviteStaff, addAlert }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(NewStaff));
