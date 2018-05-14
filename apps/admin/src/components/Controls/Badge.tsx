import React from 'react';
import styled from 'styled-components';

import {
  blue,
  brown,
  green,
  grey,
  pink,
  yellow,
  white,
  colorFromString
} from 'styles/colors';

const badgeColors = [blue, brown, green, pink, yellow];

interface Props {
  className?: string;
  color?: string;
  text: string;
}

class Badge extends React.Component<Props, {}> {
  render() {
    const { className, text } = this.props;

    return <div className={className}>{text}</div>;
  }
}

const StyledBadge = styled(Badge)`
  background-color: ${({ color, text }) => {
    if (color) return color;
    return colorFromString(text.toUpperCase(), badgeColors)
  }};
  border-radius: 4px;
  color: ${white};
  display: inline-block;
  font-size: 0.825rem;
  padding-bottom: 0.4em;
  padding-left: 0.75em;
  padding-right: 0.75em;
  padding-top: 0.425em;
  text-transform: uppercase;
`;

export default StyledBadge;
