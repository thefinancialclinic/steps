import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';


import Badge from './Badge';

const Components = storiesOf('Components', module)
  .addDecorator(withKnobs)
  .addDecorator(story => (
    <BrowserRouter>{story()}</BrowserRouter>
  ));

Components
  .add('Badge', () => <Badge text={text('Text', 'hello')} /> )

export default Components;
