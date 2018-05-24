import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import NoChat from './NoChat';

interface Props {
  className?: string;
}

class ChatList extends React.Component<Props, {}> {

  render () {
    const chats = [];
    const chatDisplay = chats.length > 0 ? (
        <Box width={1} p={4}>
          A list of chat items goes here
        </Box>
    ) : (
        <Box width={1} p={4}>
          <NoChat></NoChat>
        </Box>
      );

    return (
      <div>
        {chatDisplay}
      </div>
    );
  }
}

const StyledChatList = styled(ChatList)`
  display: flex;
`;

export default StyledChatList;
