import { select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import Button from 'atoms/Buttons/Button';
import Input from 'atoms/Input/Input';
import PageHeader from 'components/Headers/PageHeader';
import React from 'react';
import { pink } from 'styles/colors';
import 'styles/global';
import { Alert } from './Alert/Alert';
import { AlertLevel } from './Alert/types';
import ChatMedia from './Chat/ChatMedia';
import ChatMessage from './Chat/ChatMessage';
import ChatMessages from './Chat/ChatMessages';
import Request from './Chat/Request';
import NameCard from './Clients/NameCard';
import TermsModal from './Clients/TermsModal';
import VideoModal from './Clients/VideoModal';
import DataRow from './DataTable/DataRow';
import DataTable from './DataTable/DataTable';
import NavDropdown from './Dropdowns/NavDropdown';
import Modal from './Modal';
import NavGroup from './NavGroup/NavGroup';
import PhotoUpload from './PhotoUpload';
import Sidebar from './Sidebar/Sidebar';
import StaffList from './StaffList/StaffList';
import StaffListItem from './StaffList/StaffListItem';
import { PermissionLevel } from './StaffList/types';
import TaskForm from './Tasks/TaskForm';
import { TaskList } from './Tasks/TaskList';
import TaskStep from './Tasks/TaskStep';
import moment from 'moment';
import Goal from './Goals/Goal';
import { Reply } from './Chat/Reply';
import { Resolved } from './Chat/Resolved';
import NewReply from './Chat/NewReply';
import ReplyForm from 'forms/ReplyForm';

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
  .add('ChatMessages', () => (
    <ChatMessages
      fromUser={{
        id: 1,
        first_name: 'Roo',
        last_name: 'Bot',
        email: 'bot@example.com',
        phone: null,
        coach_id: 0,
        org_id: 0,
        color: null,
        goals: [],
        status: 'WORKING',
        updated: null,
        platform: 'SMS',
        image: null,
        follow_up_date: null,
        checkin_times: null,
        topic: null,
      }}
      user={{
        id: 1,
        first_name: 'Ron',
        last_name: 'Donald',
        email: 'ron@example.com',
        phone: null,
        coach_id: 0,
        org_id: 0,
        color: null,
        goals: [],
        status: 'WORKING',
        updated: null,
        platform: 'SMS',
        image: null,
        follow_up_date: null,
        checkin_times: null,
        topic: null,
      }}
      media={[
        {
          id: 1,
          title: "Tres & Tanya's Story",
          url: 'https://soundcloud.com/bedstuyrestocorp/tres-tanyas-story',
          image:
            'https://i1.sndcdn.com/artworks-000311861322-omp1pm-t500x500.jpg',
        },
      ]}
      messages={[
        {
          id: 1,
          to_user: 1,
          from_user: 2,
          request_id: null,
          timestamp: moment(new Date(2018, 4, 21, 1)),
          text: "Hey there! It's me, Roo. Hoping you're having a great day.",
        },
        {
          id: 2,
          to_user: 1,
          from_user: 2,
          request_id: null,
          timestamp: moment(new Date(2018, 4, 21, 2)),
          text: "Here's a short story that might interest you:",
          media_id: 1,
        },
        {
          id: 3,
          to_user: 1,
          from_user: 2,
          request_id: null,
          timestamp: moment(new Date(2018, 4, 21, 3)),
          text: "If you want to hear more of Tres & Tanya's story, text 1.",
        },
        {
          id: 4,
          to_user: 1,
          from_user: 2,
          request_id: null,
          timestamp: moment(new Date(2018, 4, 22, 4)),
          text:
            "Hi hi! How's it going with finishing your task? Text DONE, HELP, or STILL WORKING",
        },
        {
          id: 5,
          to_user: 2,
          from_user: 1,
          request_id: null,
          timestamp: moment(new Date(2018, 4, 22, 5)),
          text: 'Still working',
        },
        {
          id: 6,
          to_user: 1,
          from_user: 2,
          request_id: null,
          timestamp: moment(new Date(2018, 4, 22, 6)),
          text:
            "Okay, great! If you need any help just text HELP, if you're done, text DONE.",
        },
      ]}
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
  .add('Request', () => (
    <Request
      status={select(
        'Status',
        ['NEEDS_ASSISTANCE', 'REPLIED', 'RESOLVED'],
        'NEEDS_ASSISTANCE',
      )}
      message="I tried calling my credit card but couldn't get through to them"
      date={moment.utc()}
    />
  ))
  .add('Reply', () => <Reply message="Rafa, you should do x and y." />)
  .add('ReplyForm', () => <ReplyForm onSubmit={() => {}} />)
  .add('Resolved', () => <Resolved />)
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
  .add('VideoModal', () => (
    <VideoModal
      embedURL="https://www.youtube.com/embed/WpHtdkKQz8Q"
      onClose={() => {}}
    />
  ))
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
    <Alert onClose={() => {}} level={AlertLevel.Error}>
      This is an error alert
    </Alert>
  ))
  .add('Warning Alert', () => (
    <Alert onClose={() => {}} level={AlertLevel.Warning}>
      This is a warning alert
    </Alert>
  ))
  .add('Info Alert', () => (
    <Alert onClose={() => {}} level={AlertLevel.Info}>
      This is an info alert
    </Alert>
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
  ))
  .add('Photo Upload', () => <PhotoUpload />)
  .add('Goal', () => (
    <Goal text="My goal is to go to the moon" onEdit={() => {}} />
  ));

export default Components;
