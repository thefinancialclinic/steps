import { boolean, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import Header from 'atoms/Header';
import Dropdown from 'components/Dropdowns/Dropdown';
import React from 'react';
import { blue, brown, green, pink } from 'styles/colors';
import Badge from './Badge';
import BackButton from './Buttons/BackButton';
import Button from './Buttons/Button';
import Filter from '../components/Filter';
import Input from './Input/Input';
import Main from './Main';
import Panel from './Panel';

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
