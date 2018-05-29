import React from "react";
import styled from "styled-components";
import Color from "color";

import { darkBlue, white } from "styles/colors";

interface Props {
  children: any;
  className?: string;
  shadow?: boolean;
  fill?: boolean;
}

class Panel extends React.Component<Props, {}> {
  render() {
    const { children, className, fill, shadow } = this.props;
    let PanelEl = shadow ? ShadowedPanel : BasePanel;

    if (fill)
      PanelEl = PanelEl.extend`
        ${FillPanelCss};
      `;

    return <PanelEl className={className}>{children}</PanelEl>;
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
