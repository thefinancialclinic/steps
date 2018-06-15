import Panel from 'atoms/Panel';
import React from 'react';
import styled from 'styled-components';
import { white, green } from 'styles/colors';

export const Resolved: React.SFC = () => (
  <StyledResolved>
    <Panel className="container">
      <Message>Your response helped resolve the problem.</Message>
    </Panel>
  </StyledResolved>
);

export const Message = styled.div`
  font-size: 30px;
`;

const StyledResolved = styled.div`
  font-family: 'Calibre', sans-serif;
  margin: 20px;

  .container {
    padding: 30px;
    color: ${white};
    background-color ${green};
    text-align: center;
  }
`;

export default Resolved;
