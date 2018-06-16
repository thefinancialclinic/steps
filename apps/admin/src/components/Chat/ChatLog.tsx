import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import NoChat from './NoChat';
import ChatMessages from './ChatMessages';

interface Props {
  className?: string;
  client: any;
}

class ChatList extends React.Component<Props, {}> {
  render() {
    const { client } = this.props;
    const { messages } = client;
    console.log(messages);

    const chatDisplay =
      messages.length > 0 ? (
        <Box width={1}>
          <ChatMessages messages={messages} user={client} media={[]} />
        </Box>
      ) : (
        <Box width={1}>
          <NoChat type="log" />
        </Box>
      );

    return <div>{chatDisplay}</div>;
  }
}

const StyledChatList = styled(ChatList)`
  display: flex;
`;

export default StyledChatList;
