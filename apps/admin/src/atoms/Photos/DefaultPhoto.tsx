import React from 'react';
import styled from 'styled-components';

const DefaultPhoto: React.SFC = () => {
  return <StyledIcon className="material-icons">face</StyledIcon>;
};

const StyledIcon = styled.i`
  font-size: 5rem;
`;

export default DefaultPhoto;
