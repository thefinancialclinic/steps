import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';


import Badge from './Badge';
import NavGroup from './NavGroup/NavGroup';

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

export default Components;
