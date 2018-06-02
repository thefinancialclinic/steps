import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { storiesOf } from '@storybook/react';
import { boolean, select, text } from '@storybook/addon-knobs/react';
import backgrounds from '@storybook/addon-backgrounds';
import { withKnobs } from '@storybook/addon-knobs/react';

import ChatMedia from './Chat/ChatMedia';
import ChatMessage from './Chat/ChatMessage';
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
import TermsModal from './Clients/TermsModal';

import { pink, lightBlue, white } from 'styles/colors';
import 'styles/global';

export const Components = storiesOf('Components', module)
  .add('ChatMedia', () => (
    <ChatMedia
      title={text('Title', "Tres & Tanya's Story")}
      url={text(
        'URL',
        'https://soundcloud.com/bedstuyrestocorp/tres-tanyas-story'
      )}
      image={text(
        'Image',
        'https://i1.sndcdn.com/artworks-000311861322-omp1pm-t500x500.jpg'
      )}
    />
  ))
  .add('ChatMessage', () => (
    <ChatMessage
      type={select('Type', ['sent', 'received'], 'sent')}
      text={text(
        'Text',
        "Hi hi! How's it going with finishing your task? Text DONE, HELP, or STILL WORKING"
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
  .add('Input Row', () => <InputRow label="Bob" name="name" />)
  .add('Staff List', () => <StaffList />)
  .add('Staff List Item', () => <StaffListItem />)
  .add('Modal', () => (
    <Modal>
      <div>This is a child in a panel.</div>
    </Modal>
  ))
  .add('Task Form', () => <TaskForm badgeText="boo">child</TaskForm>)
  .add('Task Step', () => <TaskStep count={1} />)
  .add('Task Template', () => (
    <TaskTemplate category="boo" description="Do this thing" />
  ))
  .add('TermsModal', () => <TermsModal phoneNumber="+15558675309" link="#" />);

export default Components;
