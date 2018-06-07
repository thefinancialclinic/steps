import React from 'react';
import styled from 'styled-components';
import map from 'lodash/map';

import { storiesOf } from '@storybook/react';

import colors from './colors';

const ColorSquare: any = styled.div`
  color: ${colors.black};
  display: inline-block;
  font-family: monospace;
  margin-bottom: 1em;
  margin-right: 1em;
  position: relative;
  text-align: center;
  width: 100px;

  &,
  > * {
    box-sizing: border-box;
  }

  .name {
    margin-bottom: 0.25em;
  }

  input {
    border: none;
    border-radius: 3px;
    box-shadow: inset 0 0 0 1px ${colors.mediumBlue};
    color: ${colors.black};
    font-family: monospace;
    font-size: 1.25em;
    padding-bottom: 0.25em;
    padding-top: 0.25em;
    text-align: center;
    width: 100%;
  }

  .color {
    background-color: ${props => props.color};
    height: 100px;
    margin-bottom: 0.25em;
    width: 100px;
  }
`;

const Components = storiesOf('Styles', module);

Components.add('Colors', () => {
  return map(colors, (color, name) => (
    <ColorSquare color={color} key={name}>
      <div className="name">{name}</div>
      <div className="color" />
      <input defaultValue={color} />
    </ColorSquare>
  ));
});

export default Components;
