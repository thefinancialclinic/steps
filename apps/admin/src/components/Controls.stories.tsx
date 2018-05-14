import React from 'react';

import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs/react';

import Badge from 'components/Controls/Badge';
import Button from 'components/Controls/Button';
import Filter from 'components/Controls/Filter';
import Input from 'components/Controls/Input';

import { blue, brown, green, pink } from 'styles/colors';

const Controls = storiesOf('Controls', module)
  .add('Badge', () => <Badge text={text('Text', 'hello')} />)
  .add('Button', () => (
    <Button white={boolean('white', false)}>
      {text('Button Text', 'Proceed to Ride')}
    </Button>
  ))
  .add('Input', () => (
    <Input rounded={boolean('Rounded', true)} />
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
  ));

export default Controls;
