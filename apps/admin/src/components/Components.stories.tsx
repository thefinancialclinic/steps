import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs/react';
import backgrounds from '@storybook/addon-backgrounds';
import { withKnobs } from '@storybook/addon-knobs/react';

import NameCard from './Clients/NameCard';
import NavGroup from './NavGroup/NavGroup';
import Sidebar from './Sidebar/Sidebar';

import { lightBlue, white } from 'styles/colors';
import 'styles/global';

export const Components = storiesOf('Components', module)
  .add('NameCard', () => (
    <NameCard title={text('Title', 'Matthew Epler')} />
  ))
  .add('NavGroup', () => (
    <NavGroup
      links={[
        { text: 'first', to: '/first' },
        { text: 'second', to: '/second' }
      ]}
    />
  ))
  .add('Sidebar', () => <Sidebar />)

export default Components;
