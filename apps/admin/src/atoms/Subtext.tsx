import React from 'react';
import { grey } from 'styles/colors';
import styled from 'styled-components';
import { remCalc } from 'styles/type';

const Subtext: React.SFC<{}> = ({ children }) => (
  <StyledText>{children}</StyledText>
);

const StyledText = styled.p`
  color: ${grey};
  margin-bottom: ${remCalc(40)};
`;

export default Subtext;
