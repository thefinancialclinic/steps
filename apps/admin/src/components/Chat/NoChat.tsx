import React, { Component } from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import Panel from 'atoms/Panel';

interface Props {
  className?: string;
  type: string;
}

class NoChat extends React.Component<Props, {}> {

  render() {
    const { className, type} = this.props;
    let message: string = '';

    if(type === 'log') {
      message = "Chatting hasn't started. Come back later."
    } else {
      message = "Looks like your client hasn't messaged you yet."
    }

    return (

      <Box width={1} p={4} className={className}>
        <Panel>
          <div>[Image Here]</div>
          <div>{message}</div>
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
