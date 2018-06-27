import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import { darkBlue, white } from 'styles/colors';

interface Props {
  className?: string;
  shadow?: boolean;
  fill?: boolean;
  noPadding?: boolean;
}

class Panel extends React.Component<Props, {}> {
  render() {
    const { children, className, fill, shadow, noPadding = false } = this.props;
    let PanelEl = shadow ? ShadowedPanel : BasePanel;
    const padding = noPadding ? '0' : '1.5em';

    if (fill)
      PanelEl = PanelEl.extend`
        ${FillPanelCss};
      `;

    return (
      <PanelEl padding={padding} className={className}>
        {children}
      </PanelEl>
    );
  }
}

const BasePanel = styled<{ padding: string }, 'div'>('div')`
  background-color: ${white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: ${({ padding }) => padding};
`;

const ShadowedPanel = BasePanel.extend`
  box-shadow: 0 0 4px
    ${Color(darkBlue)
      .fade(0.75)
      .rgb()
      .string()};
`;

const FillPanelCss = `
  height: 100%;
`;

export default Panel;
