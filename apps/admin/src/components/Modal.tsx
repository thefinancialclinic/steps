import React from 'react';
import styled from 'styled-components';
import Overlay from 'atoms/Overlay';
import Panel from 'atoms/Panel';
import { white } from 'styles/colors';

interface Props {
  title?: string;
  children?: any;
}

class Modal extends React.Component<Props, {}> {
  render() {
    const { title, children } = this.props;

    return (
      <div>
        <Panel modal>{children}</Panel>
        <Overlay />
      </div>
    );
  }
}

const StyledModal = styled(Modal)`
  Panel {
    position: absolute;
    z-index: 2;
    background-color: white;
    top: 10%;
    right: 10%;
    left: 10%;
    bottom: 10%;
  }
`;

export default Modal;
