import React, { Component } from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import Panel from 'atoms/Panel';

interface Props {
  className?: string;
}

class NoChat extends React.Component<Props, {}> {

  render() {
    const { className } = this.props;

    return (
      <Box width={1} p={4} className={className}>
        <Panel>
          <div>[Image Here]</div>
          <div>Chatting hasn't started. Come back later.</div>
        </Panel>
      </Box>
    );
  }
}

const StyledNoChat = styled(NoChat)`
  text-align: center;
  font-size: 1.5em;
  line-height: 1.5;
`;

export default StyledNoChat;
