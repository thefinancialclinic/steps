import React from 'react';
import styled from 'styled-components';

import {
  blue,
  brown,
  green,
  pink,
  yellow,
  white,
  colorFromString
} from '../styles/colors';

const badgeColors = [blue, brown, green, pink, yellow];

interface Props {
  className?: string;
  text: string;
}

class Badge extends React.Component<Props, {}> {
  render() {
    const { className, text } = this.props;

    return <div className={className}>{text}</div>;
  }
}

const StyledLabel = styled(Badge)`
  background-color: ${props => colorFromString(props.text.toUpperCase(), badgeColors)};
  border-radius: 3px;
  color: ${white};
  display: inline-block;
  padding-bottom: 0.325em;
  padding-left: 0.75em;
  padding-right: 0.75em;
  padding-top: 0.325em;
  text-transform: uppercase;
`;

export default StyledLabel;
