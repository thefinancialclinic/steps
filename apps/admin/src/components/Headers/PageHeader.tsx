import Header from 'atoms/Header';
import { Box } from 'grid-styled';
import React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
}

const PageHeader: React.SFC<Props> = ({ children, label }) => (
  <Header>
    <StyledHeading>{label}</StyledHeading>
    <Box>{children}</Box>
  </Header>
);

const StyledHeading = styled.h1`
  font-size: 60px;
  margin: 0;
`;

export default PageHeader;
