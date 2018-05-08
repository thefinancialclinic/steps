import React from 'react';
import styled from 'styled-components';

import { white, badgeColors } from '../styles/colors';

interface Props {
  className?: string;
  text: string;
}

class Badge extends React.Component<Props, {}> {
  render () {
    const { className, text } = this.props;

    return (
      <div className={className}>
        {text}
      </div>
    );
  }
}

const getColor = (text: string): string => {
  const colors = Object.values(badgeColors);

  let n = 0;
  for (var i = 0; i < text.length; ++i) {
    n = (n + text.charCodeAt(i)) % colors.length;
  }

  return colors[n];
};

const StyledLabel = styled(Badge)`
  background-color: ${props => getColor(props.text.toUpperCase())};
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
