import React from 'react';
import Label from 'atoms/Label';
import { Box, Flex } from 'grid-styled';
import { mediumBlue } from 'styles/colors';
import styled from 'styled-components';
import { remCalc } from 'styles/type';

interface Props {
  label: string;
}

const DataRow: React.SFC<Props> = ({ label, children }) => (
  <StyledRow alignItems="center">
    <Box width={[1 / 3]}>
      <Label>{label}</Label>
    </Box>
    <Box width={[2 / 4]}>{children}</Box>
  </StyledRow>
);

const StyledRow = styled(Flex)`
  border-bottom: 1px solid ${mediumBlue};
  padding-top: ${remCalc(25)} 
  padding-bottom: ${remCalc(25)} 
`;

export default DataRow;
