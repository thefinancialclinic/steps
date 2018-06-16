import React from 'react';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import NoChat from './NoChat';

interface Props {
  className?: string;
}

class ChatList extends React.Component<Props, {}> {
  render() {
    const helpItems = [];
    const helpDisplay =
      helpItems.length > 0 ? (
        <Box width={1}>Help items go here</Box>
      ) : (
        <Box width={1}>
          <NoChat type="help" />
        </Box>
      );

    return <div>{helpDisplay}</div>;
  }
}

const StyledChatList = styled(ChatList)`
  display: flex;
`;

export default StyledChatList;
