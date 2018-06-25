import { User } from 'reducers/auth';
import Modal from '../Modal';
import React from 'react';
import Close from 'atoms/Icons/Close';
import EditClientProfileForm from 'forms/EditClientProfileForm';
import styled from 'styled-components';
import { Box } from 'grid-styled';
import { remCalc } from 'styles/type';

interface Props {
  client: User;
  onSubmit(client: User): void;
}

const EditProfileModal: React.SFC<Props> = props => {
  return (
    <StyledModal>
      <Close />
      <Box width={[3 / 4]} m="auto">
        <h2>Edit Client Profile</h2>
        <EditClientProfileForm {...props} />
      </Box>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  > div {
    position: relative;
    width: ${remCalc(837)} 
    max-width: 100%;
    margin: auto;
  }
  margin: auto;
`;

export default EditProfileModal;
