import React from 'react';
import styled from 'styled-components';
import * as Color from 'color';

import { darkBlue, white } from 'styles/colors';

interface Props {
  children: any;
  shadow?: boolean;
}

class Panel extends React.Component<Props, {}> {
  static defaultProps = { shadow: false };

  render() {
    const { children, shadow } = this.props;
    const PanelEl = shadow ? ShadowedPanel : BasePanel;

    return (
      <PanelEl>
        {children}
      </PanelEl>
    );
  }
}

const BasePanel = styled.div`
  background-color: ${white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
`;

const ShadowedPanel = BasePanel.extend`
  box-shadow: 0 0 4px ${Color(darkBlue).fade(0.75).rgb().string()};
`;

export default Panel;
