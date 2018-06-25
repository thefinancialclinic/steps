import styled from 'styled-components';
import React from 'react';
import { Flex } from 'grid-styled';
import { grey } from 'styles/colors';
import { Link } from 'react-router-dom';

interface Props {
  component?: string;
  to?: string;
  onClick?(): void;
}

const EditButton: React.SFC<Props> = ({ component, onClick, to }) => (
  <StyledLink to={to}>
    <StyledEditButton alignItems="center" onClick={onClick}>
      <i className="material-icons">edit</i>
      Edit{component ? ` ${component}` : ''}
    </StyledEditButton>
  </StyledLink>
);

const StyledEditButton = styled(Flex)`
  color: ${grey};
  cursor: pointer;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default EditButton;
