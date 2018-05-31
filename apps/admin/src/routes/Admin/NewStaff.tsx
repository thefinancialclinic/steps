import * as React from 'react';
import Modal from '../../components/Modal';
import styled from 'styled-components';
import ButtonLink from 'atoms/ButtonLink';
import NewStaffForm from './NewStaffForm';

interface Props {
  actions: { createStaff: any };
}

export class NewStaff extends React.Component<Props, {}> {
  // createClient = clientData => {
  //   this.props.actions.createClient(clientData)
  //     .then(res => {
  //       this.setRedirect();
  //       this.renderRedirect();
  //     }).catch(error => this.setState({ shouldRedirect: false, errorMessage: error }))
  // };

  public createStaff({ emails }) {
    const splitEmails = emails.split(/,\s*/);
    this.props.actions.createStaff(splitEmails);
  }

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

export default NewStaff;
