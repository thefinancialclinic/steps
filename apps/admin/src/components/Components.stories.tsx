import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs/react';
import backgrounds from '@storybook/addon-backgrounds';
import { withKnobs } from '@storybook/addon-knobs/react';

import InputRow from './Forms/InputRow';
import NameCard from './Clients/NameCard';
import NavDropdown from './NavDropdown/NavDropdown';
import NavGroup from './NavGroup/NavGroup';
import Sidebar from './Sidebar/Sidebar';
import StaffList from './StaffList/StaffList';
import StaffListItem from './StaffList/StaffListItem';
import Modal from './Modal';
import TaskForm from './Tasks/TaskForm';
import TaskStep from './Tasks/TaskStep';
import TaskTemplate from './Tasks/TaskTemplate';

import { lightBlue, white } from 'styles/colors';
import 'styles/global';

export const Components = storiesOf('Components', module)
  .add('NameCard', () => (
    <NameCard title={text('Title', 'Matthew Epler')} />
  ))
  .add('NavDropdown', () => (
    <NavDropdown
      title="Coach Name"
      links={[
        { text: 'My Clients', to: '#' },
        { text: 'Add New Client', to: '#' }
      ]}
    />
  ))
  .add('NavGroup', () => (
    <NavGroup
      links={[
        { text: 'first', to: '/first' },
        { text: 'second', to: '/second' }
      ]}
    />
  ))
  .add('Sidebar', () => <Sidebar links={[{ to: '', text: '' }]} />)
  .add('Input Row', () => (
    <InputRow
      label='Bob'
      name='name'
    />
  ))
  .add('Staff List', () => <StaffList />)
  .add('Staff List Item', () => <StaffListItem />)
  .add('Modal', () => (
    <Modal>
      <div>This is a child in a panel.</div>
    </Modal>
  ))
  .add('Task Form', () => <TaskForm badgeText="boo">child</TaskForm>)
  .add('Task Step', () => <TaskStep count={1} />)
  .add('Task Template', () => <TaskTemplate category='boo' description='Do this thing' />);

export default Components;
