import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs/react';
import backgrounds from '@storybook/addon-backgrounds';
import { withKnobs } from '@storybook/addon-knobs/react';

import NavGroup from './NavGroup/NavGroup';
import Sidebar from './Sidebar/Sidebar';
import Panel from './Panels/Panel';

import { lightBlue, white } from 'styles/colors';
import 'styles/global';

export const Components = storiesOf('Components', module)
  .add('NavGroup', () => (
    <NavGroup
      links={[
        { text: 'first', to: '/first' },
        { text: 'second', to: '/second' }
      ]}
    />
  ))
  .add('Sidebar', () => <Sidebar />)
  .add('Panel', () => (
    <Panel shadow={boolean('with shadow', false)}>This is a panel</Panel>
  ))

export default Components;
