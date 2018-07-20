import styled from 'styled-components';
import React from 'react';

interface Props {
  className?: string;
}

const Main: React.SFC<Props> = ({ children }) => <Wrapper>{children}</Wrapper>;

// TODO: Content width will need to change
const Wrapper = styled.main`
  margin-bottom: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 70px;
  width: 90%;
`;

export default Main;
