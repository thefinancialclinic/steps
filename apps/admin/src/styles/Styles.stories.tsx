import React from 'react';
import styled from 'styled-components';
import map from 'lodash/map';

import { storiesOf } from '@storybook/react';

import colors from './colors';

const ColorSquare: any = styled.div`
  display: inline-block;
  margin-right: 1em;
  position: relative;
  text-align: center;
  width: 100px;

  &, > * { box-sizing: border-box; }

  input {
    text-align: center;
    width: 100%;
  }

  .color {
    background-color: ${props => props.color};
    width: 100px;
    height: 100px;
  }
`;

const Components = storiesOf('Styles', module)

Components
  .add('Colors', () => {
    return map(colors, (color, name, i) => (
      <ColorSquare color={color} key={i}>
        <div>{name}</div>
        <div className='color' />
        <input value={color} />
      </ColorSquare>
    ));
  })

export default Components;
