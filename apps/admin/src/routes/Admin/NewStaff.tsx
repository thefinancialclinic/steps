import { AlertLevel } from 'components/Alert/types';
import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Modal from 'components/Modal';
import NewStaffForm from 'forms/NewStaffForm';
import { inviteStaff } from 'actions/staff';
import { addAlert } from 'actions/alerts';
import { Flex } from 'grid-styled';

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
        this.props.actions.addAlert(err.message, AlertLevel.Error);
      });
  };

  render() {
    return (
      <StyledModal>
        <Flex justifyContent="center">
          <NewStaffForm onSubmit={this.createStaff} />
        </Flex>
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
  actions: bindActionCreators({ inviteStaff, addAlert }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(NewStaff));
