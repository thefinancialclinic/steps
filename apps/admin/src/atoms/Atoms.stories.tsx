import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs/react';
import backgrounds from '@storybook/addon-backgrounds';
import { withKnobs } from '@storybook/addon-knobs/react';

import Badge from './Badge';
import Button from './Button';
import Dropdown from './Dropdown';
import Filter from './Filter';
import Input from './Input';
import Panel from './Panel';

import { blue, brown, green, lightBlue, pink, white } from 'styles/colors';

const Stories = storiesOf('Atoms', module)
  .add('Badge', () => <Badge text={text('Text', 'hello')} rounded={boolean('rounded', false)} />)
  .add('Button', () => (
    <Button white={boolean('white', false)}>
      {text('Button Text', 'Proceed to Ride')}
    </Button>
  ))
  .add('Input', () => (
    <Input rounded={boolean('Rounded', false)} />
  ))
  .add('Filter', () => (
    <Filter
      categories={[
        { name: 'Debt', active: boolean('Debt: active', false), color: pink },
        { name: 'Budget', active: boolean('Budget: active', false), color: brown },
        { name: 'Credit', active: boolean('Credit: active', false), color: blue },
        { name: 'Saving', active: boolean('Saving: active', false), color: green }
      ]}
    />
  ))
  .add('Panel', () => (
    <Panel shadow={boolean('with shadow', false)}>This is a panel</Panel>
  ))
  .add('Dropdown', () => (
    <Dropdown title='Dropdown'>
      <p>Dropdown content. Click title to hide.</p>
    </Dropdown>
  ));

export default Stories;
