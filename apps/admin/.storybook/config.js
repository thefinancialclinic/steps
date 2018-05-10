import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { addDecorator, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import backgrounds from '@storybook/addon-backgrounds';

import { lightBlue, white } from 'styles/colors';

const req = require.context('../src', true, /.stories.tsx$/);
function loadStories() {
  return req.keys().forEach(req);
}

addDecorator(story => <BrowserRouter><div>{story()}</div></BrowserRouter>)
addDecorator(withKnobs)
addDecorator(
  backgrounds([
    { name: 'lightBlue', value: lightBlue, default: true },
    { name: 'white', value: white }
  ])
)

configure(loadStories, module)
