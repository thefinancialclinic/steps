import React from 'react';
import styled from 'styled-components';

import Panel from 'atoms/Panel';
import { white, mediumBlue } from 'styles/colors';

type ChatMessageType = 'sent' | 'received';

interface Props {
  className?: string;
  type?: ChatMessageType;
  text: string;
  from?: string;
  color?: string;
}

class ChatMessage extends React.Component<Props, {}> {
  static props = {
    type: 'received',
    color: mediumBlue,
  };

  render() {
    const { className, type, text, from } = this.props;
    return (
      <div className={className}>
        <Panel className="message">{text}</Panel>
        <div className="from">{from}</div>
      </div>
    );
  }
}

const StyledChatMessage = styled<Props>(ChatMessage)`
    font-family: 'Tiempos', serif;
    font-size: 21px;
    display: flex;
    justify-content: flex-end;

    flex-direction: ${({ type }) =>
      type === 'received' ? 'row-reverse' : 'row'}

    .message {
      background-color: ${({ type, color }) =>
        type === 'received' ? color : white};
      display: inline-block;
      padding: 20px;
      line-height: 25px;
    }

    .from {
      display: inline-block;
      font-size: 28px;
      width: 65px;
      height: 65px;
      border-radius: 65px;
      color: ${white};
      background-color: ${({ type, color }) =>
        type === 'received' ? color : mediumBlue};
      text-align: center;
      vertical-align: middle;
      line-height: 65px;
      margin: 0 10px;
    }
  }
`;

export default StyledChatMessage;
