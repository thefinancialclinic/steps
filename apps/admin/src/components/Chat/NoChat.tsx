import React, { Component } from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import { blue } from 'styles/colors';
import Panel from 'atoms/Panel';

interface Props {
  className?: string;
  type: string;
}

class NoChat extends React.Component<Props, {}> {

  render() {
    const { className, type} = this.props;
    let message: string = '';
    let icon: string = '';

    if(type === 'log') {
      message = "Chatting hasn't started. Come back later."
      icon = 'message';
    } else {
      message = "Looks like your client hasn't messaged you yet."
      icon = 'live_help';
    }

    return (

      <Box width={1} p={4} className={className}>
        <Panel>
          <div><i className='material-icons'>{icon}</i></div>
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
  i {
    font-size: 6em;
    color: ${blue};
  }
`;

export default StyledNoChat;
