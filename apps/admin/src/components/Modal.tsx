import React from 'react';
import styled from 'styled-components';
import Panel from 'atoms/Panel';
import { black } from 'styles/colors';

interface Props {
  children?: any;
  className?: string;
}

class Modal extends React.Component<Props, {}> {
  render() {
    const { children, className } = this.props;
    return (
      <div className={className}>
        <Panel>{children}</Panel>
      </div>
    );
  }
}

const StyledModal = styled(Modal)`
    background: ${black}50;
    bottom: 0;
    left: 0;
    padding: 1em;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;

export default StyledModal;
