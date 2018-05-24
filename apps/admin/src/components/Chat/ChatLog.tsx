import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import NoChat from './NoChat';
import NavGroup from 'components/NavGroup/NavGroup';

interface Props {
  className?: string;
}

class ChatList extends React.Component<Props, {}> {

  render () {
    const chats = [];
    const chatDisplay = chats.length > 0 ? (
        <Box width={1}>
          A list of chat items goes here
        </Box>
    ) : (
        <Box width={1}>
          <NoChat></NoChat>
        </Box>
      );

    return (
      <div>
        <Box m={4} mb={0}>
          <NavGroup
            links={[
              { text: 'log', to: '/log' },
              { text: 'help', to: '/help' }
            ]}
          />  </Box>
        {chatDisplay}

      </div>
    );
  }
}

const StyledChatList = styled(ChatList)`
  display: flex;
`;

export default StyledChatList;
