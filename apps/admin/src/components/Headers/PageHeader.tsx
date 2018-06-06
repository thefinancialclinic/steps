import Header from 'atoms/Header';
import { Box } from 'grid-styled';
import { HTMLProps } from 'helpers/types';
import React from 'react';
import styled from 'styled-components';

interface Props extends HTMLProps {
  label: string;
}

const PageHeader: React.SFC<Props> = ({ className, children, label }) => (
  <Header>
    <StyledHeading>{label}</StyledHeading>
    <Box>{children}</Box>
  </Header>
);

const StyledHeading = styled.h1`
  font-size: 60px;
`;

export default PageHeader;
