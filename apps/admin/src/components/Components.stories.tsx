import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';


import Badge from './Badge';
import Button from './Button/Button';
import NavGroup from './NavGroup/NavGroup';
import Sidebar from './Sidebar/Sidebar';

const Components = storiesOf('Components', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <BrowserRouter>{story()}</BrowserRouter>
  ));

Components
  .add('Badge', () => <Badge text={text('Text', 'hello')} /> )
  .add('NavGroup', () => (
    <NavGroup
      links={[
        { text: 'first', to: '/first' },
        { text: 'second', to: '/second' }
      ]}
    />
  ))
  .add('Button', () => (
    <Button white={boolean('white', false)}>{text('Button Text', 'Proceed to Ride')}</Button>
  ))
  .add('Sidebar', () => (
    <Sidebar />
  ))

export default Components;
