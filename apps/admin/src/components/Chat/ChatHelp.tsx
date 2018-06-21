import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import NoChat from './NoChat';
import Requests from './Requests';

interface Props {
  className?: string;
  user: any;
}

class ChatList extends React.Component<Props, {}> {
  render() {
    const { user } = this.props;
    const { messages, requests } = this.props.user;

    return requests && requests.length > 0 ? (
      <Requests user={user} />
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
