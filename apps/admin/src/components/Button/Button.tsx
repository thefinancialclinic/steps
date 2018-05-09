import React from 'react';
import styled from 'styled-components';

import {
  darken,
  green,
  white,
} from 'styles/colors';

interface Props {
  className?: string;
  children: any;
  white?: boolean;
}

class Button extends React.Component<Props, {}> {
  static defaultProps = { white: false };

  render() {
    const { className, children, white } = this.props;

    const ButtonEl = white ? WhiteButton : GreenButton;

    return <ButtonEl>{children}</ButtonEl>;
  }
}

const BaseButton = styled.button`
  border: none;
  border-radius: 1000px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.825em;
  min-width: 180px;
  padding-bottom: 1.5em;
  padding-left: 2.25em;
  padding-right: 2.25em;
  padding-top: 1.5em;
  text-transform: uppercase;
`;

const WhiteButton = BaseButton.extend`
  background-color: ${white};
  color: ${green};
`;

const GreenButton = BaseButton.extend`
  background-color: ${green};
  color: ${white};

  &:hover {
    background-color: ${darken(green, 0.25)};
  }
`;

export default Button;
