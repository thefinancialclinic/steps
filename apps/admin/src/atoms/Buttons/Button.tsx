import React from 'react';
import styled from 'styled-components';

import { remCalc } from 'styles/type';
import { darken, green, white } from 'styles/colors';

interface Props {
  white?: boolean;
  type?: string;
  onClick?(event: any): void;
}

const Button: React.SFC<Props> = ({ white = false, children }) => {
  const ButtonEl = white ? WhiteButton : GreenButton;

  return <ButtonEl>{children}</ButtonEl>;
};

const BaseButton = styled.button`
  border: none;
  border-radius: 1000px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.825em;
  min-width: 180px;
  padding-bottom: ${remCalc(20)};
  padding-left: ${remCalc(30)};
  padding-right: ${remCalc(30)};
  padding-top: ${remCalc(20)};
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
