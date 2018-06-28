import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import NoChat from './NoChat';
import Requests from './Requests';

interface Props {
  className?: string;
  user: any;
  messages: any;
  requests: any;
}

class ChatList extends React.Component<Props, {}> {
  render() {
    const { user, messages, requests } = this.props;

    return requests && requests.length > 0 ? (
      <Requests user={user} messages={messages} requests={requests} />
    ) : (
      <Box width={1}>
        <NoChat type="help" />
      </Box>
    );
  }
}

const StyledChatList = styled(ChatList)`
  display: flex;
`;

export default StyledChatList;
