import Panel from 'atoms/Panel';
import Status from 'atoms/Status';
import { Flex } from 'grid-styled';
import React from 'react';
import styled from 'styled-components';
import { grey } from 'styles/colors';
import { sansSerif } from 'styles/type';

interface Props {
  className?: string;
  message: string;
}

export const Reply: React.SFC<Props> = ({ className, message }) => (
  <StyledReply className={className}>
    <Panel className="container">
      <Flex alignItems="center" justifyContent="space-between">
        <Status color={grey}>Reply</Status>
      </Flex>
      <Message>{message}</Message>
    </Panel>
  </StyledReply>
);

export const Message = styled.div`
  font-size: 30px;
`;

const StyledReply = styled.div`
  font-family: ${sansSerif}
  margin: 20px;

  .container {
    padding: 30px;
  }
`;

export default Reply;
