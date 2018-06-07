import styled from 'styled-components';
import React from 'react';

interface Props {
  className?: string;
}

const Main: React.SFC<Props> = ({ children }) => <Wrapper>{children}</Wrapper>;

// TODO: Content width will need to change
const Wrapper = styled.main`
  margin: 0 auto;
  width: 90%;
`;

export default Main;
