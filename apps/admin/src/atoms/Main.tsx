import styled from 'styled-components';
import React from 'react';

interface Props {
  className?: string;
}

const Main: React.SFC<Props> = ({ children }) => <Wrapper>{children}</Wrapper>;

// TODO: Content width will need to change
const Wrapper = styled.main`
  display: flex;
  justify-content: stretch;
  align-content: stretch;
  align-items: stretch;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

export default Main;
