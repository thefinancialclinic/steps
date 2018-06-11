import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs/react';
import backgrounds from '@storybook/addon-backgrounds';
import { withKnobs } from '@storybook/addon-knobs/react';

import ChatMedia from './Chat/ChatMedia';
import ChatMessage from './Chat/ChatMessage';

import NameCard from './Clients/NameCard';
import NavDropdown from './Dropdowns/NavDropdown';
import NavGroup from './NavGroup/NavGroup';
import Sidebar from './Sidebar/Sidebar';
import StaffList from './StaffList/StaffList';
import StaffListItem from './StaffList/StaffListItem';
import Modal from './Modal';
import TaskForm from './Tasks/TaskForm';
import TaskStep from './Tasks/TaskStep';
import TaskTemplate from './Tasks/TaskTemplate';
import TermsModal from './Clients/TermsModal';
import { TaskList } from './Tasks/TaskList';

import { AlertsList } from './Alert/AlertsList';
import { AlertLevel } from './Alert/types';
import { Alert } from './Alert/Alert';
import { PermissionLevel } from './StaffList/types';

import { pink, lightBlue, white } from 'styles/colors';
import 'styles/global';
import Table from 'atoms/Table/Table';
import DataRow from './DataTable/DataRow';
import DataTable from './DataTable/DataTable';
import PageHeader from 'components/Headers/PageHeader';
import Button from 'atoms/Buttons/Button';
import Input from 'atoms/Input/Input';

export const Components = storiesOf('Components', module)
  .add('ChatMedia', () => (
    <ChatMedia
      title={text('Title', "Tres & Tanya's Story")}
      url={text(
        'URL',
        'https://soundcloud.com/bedstuyrestocorp/tres-tanyas-story',
      )}
      image={text(
        'Image',
        'https://i1.sndcdn.com/artworks-000311861322-omp1pm-t500x500.jpg',
      )}
    />
  ))
  .add('ChatMessage', () => (
    <ChatMessage
      type={select('Type', ['sent', 'received'], 'sent')}
      text={text(
        'Text',
        "Hi hi! How's it going with finishing your task? Text DONE, HELP, or STILL WORKING",
      )}
      from={text('From', 'Roo')}
      color={pink}
    />
  ))
  .add('NameCard', () => <NameCard title={text('Title', 'Matthew Epler')} />)
  .add('NavDropdown', () => (
    <NavDropdown
      title="Coach Name"
      links={[
        { text: 'My Clients', to: '#' },
        { text: 'Add New Client', to: '#' },
      ]}
    />
  ))
  .add('NavGroup', () => (
    <NavGroup
      links={[
        { text: 'first', to: '/first' },
        { text: 'second', to: '/second' },
      ]}
    />
  ))
  .add('Sidebar', () => <Sidebar links={[{ to: '', text: '' }]} />)
  .add('Staff List', () => (
    <StaffList
      staff={[
        { email: 'john@example.com', pendingInvite: true },
        {
          email: 'jane@example.com',
          pendingInvite: false,
          name: 'Jane Smith',
          permissionLevel: PermissionLevel.Coach,
        },
      ]}
    />
  ))
  .add('Staff List Item', () => (
    <StaffListItem pendingInvite={true} email="john@example.com" />
  ))
  .add('Modal', () => (
    <Modal>
      <div>This is a child in a panel.</div>
    </Modal>
  ))
  .add('TermsModal', () => <TermsModal phoneNumber="+15558675309" link="#" />)
  .add('Task Form', () => (
    <TaskForm
      task={{
        id: 1,
        title: 'A task',
        description: 'You should do this',
        category: 'debt',
      }}
      client={{ id: 2 }}
    />
  ))
  .add('Task Step', () => <TaskStep count={1} />)
  // TODO: FIX LATER
  // .add('Task Template', () => <TaskTemplate task={{
  //   id: 1,
  //   title: 'As sample task',
  //   description: 'A sample description',
  //   category: 'income'
  // }}/>);
  .add('Task List', () => (
    <TaskList
      tasks={[
        {
          id: 1,
          title: 'Task #1',
          description: 'A helpful description',
        },
        {
          id: 2,
          title: 'Task #2',
          description: 'A helpful description',
        },
      ]}
      client={{ id: 1 }}
    />
  ))
  .add('Error Alert', () => (
    <Alert level={AlertLevel.Error}>This is an error alert</Alert>
  ))
  .add('Warning Alert', () => (
    <Alert level={AlertLevel.Warning}>This is a warning alert</Alert>
  ))
  .add('Info Alert', () => (
    <Alert level={AlertLevel.Info}>This is an info alert</Alert>
  ))
  .add('Data Table', () => (
    <DataTable>
      <DataRow label="label">Some data</DataRow>
    </DataTable>
  ))
  .add('Page Header', () => (
    <PageHeader label="Page Header">
      <Input />
      <Button>Some Button</Button>
    </PageHeader>
  ));

export default Components;
