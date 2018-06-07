import React from 'react';
import styled from 'styled-components';
import Color from 'color';

import { darkBlue, white } from 'styles/colors';
import Label from './Label';

interface Props {
  className?: string;
  shadow?: boolean;
  fill?: boolean;
  label?: string;
}

const Panel: React.SFC<Props> = ({
  children,
  className,
  fill,
  shadow,
  label,
}) => {
  let PanelEl = shadow ? ShadowedPanel : BasePanel;
  if (fill)
    PanelEl = PanelEl.extend`
      ${FillPanelCss};
    `;

  return (
    <section>
      {label && <StyledLabel>{label}</StyledLabel>}
      <PanelEl className={className}>{children}</PanelEl>
    </section>
  );
};

const StyledLabel = styled(Label)`
  margin-bottom: 10px;
`;

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
