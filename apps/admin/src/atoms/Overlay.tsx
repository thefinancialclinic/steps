import React from 'react';
import styled from 'styled-components';
import * as Color from 'color';

import { black } from 'styles/colors';

interface Props {
  className?: string;
}

class Overlay extends React.Component<Props, {}> {
  render() {
    const { className } = this.props;
    let OverlayEl = BaseOverlay;
    return <OverlayEl className={className} />;
  }
}

const BaseOverlay = styled.div`
  background-color: ${black};
  opacity: 0.5;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;

export default Overlay;
