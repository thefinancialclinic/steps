import styled from 'styled-components';
import React from 'react';
import { Flex } from 'grid-styled';
import { grey } from 'styles/colors';

interface Props {
  component: string;
  onClick?(): void;
}

const EditButton: React.SFC<Props> = ({ component, onClick }) => (
  <StyledEditButton alignItems="center" onClick={onClick}>
    <i className="material-icons">edit</i>
    Edit {component}
  </StyledEditButton>
);

const StyledEditButton = styled(Flex)`
  color: ${grey};
  cursor: pointer;
  text-transform: uppercase;
`;

export default EditButton;
