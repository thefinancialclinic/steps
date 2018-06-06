import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs/react';
import backgrounds from '@storybook/addon-backgrounds';
import { withKnobs } from '@storybook/addon-knobs/react';

import Badge from './Badge';
import Button from './Buttons/Button';
import Dropdown from './Dropdown';
import Filter from './Filter';
import Input from './Input/Input';
import Panel from './Panel';

import { blue, brown, green, lightBlue, pink, white } from 'styles/colors';
import Main from './Main';
import BackButton from './Buttons/BackButton';
import Header from 'atoms/Header';

const Stories = storiesOf('Atoms', module)
  .add('Badge', () => (
    <Badge text={text('Text', 'hello')} rounded={boolean('rounded', false)} />
  ))
  .add('Button', () => (
    <Button white={boolean('white', false)}>
      {text('Button Text', 'Proceed to Ride')}
    </Button>
  ))
  .add('Back Button', () => <BackButton to="#" />)
  .add('Dropdown', () => (
    <Dropdown title="Dropdown">
      <p>Dropdown content. Click title to hide.</p>
    </Dropdown>
  ))
  .add('Input', () => (
    <Input rounded={boolean('Rounded', false)} type={text('Type', 'text')} />
  ))
  .add('Filter', () => (
    <Filter
      categories={[
        { name: 'Debt', active: boolean('Debt: active', false), color: pink },
        {
          name: 'Budget',
          active: boolean('Budget: active', false),
          color: brown,
        },
        {
          name: 'Credit',
          active: boolean('Credit: active', false),
          color: blue,
        },
        {
          name: 'Saving',
          active: boolean('Saving: active', false),
          color: green,
        },
      ]}
    />
  ))
  .add('Panel', () => (
    <Panel shadow={boolean('with shadow', false)}>This is a panel</Panel>
  ))
  .add('Main', () => <Main>Some page content</Main>)
  .add('Header', () => (
    <Header>
      <h1>A header child</h1>
      <h2>Another header child</h2>
    </Header>
  ));

export default Stories;
