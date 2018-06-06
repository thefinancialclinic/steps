import styled from 'styled-components';
import React from 'react';
import { HTMLProps } from 'helpers/types';

const Main: React.SFC<HTMLProps> = ({ children, className }) => (
  <Wrapper className={className}>{children}</Wrapper>
);

// TODO: Content width will need to change
const Wrapper = styled.main`
  margin: 0 auto;
  width: 90%;
`;

export default Main;
