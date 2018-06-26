import { select, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import Button from 'atoms/Buttons/Button';
import Input from 'atoms/Input/Input';
import UserProfile from 'components/Admin/UserProfile';
import RequestDetail from 'components/Chat/RequestDetail';
import PageHeader from 'components/Headers/PageHeader';
import ReplyForm from 'forms/ReplyForm';
import moment from 'moment';
import React from 'react';
import { USER_TYPE } from 'reducers/auth';
import { pink } from 'styles/colors';
import 'styles/global';
import OrganizationProfile from './Admin/OrganizationProfile';
import { Alert } from './Alert/Alert';
import { AlertLevel } from './Alert/types';
import ChatMedia from './Chat/ChatMedia';
import ChatMessage from './Chat/ChatMessage';
import ChatMessages from './Chat/ChatMessages';
import { Reply } from './Chat/Reply';
import Request from './Chat/Request';
import { Resolved } from './Chat/Resolved';
import NameCard from './Clients/NameCard';
import TermsModal from './Clients/TermsModal';
import VideoModal from './Clients/VideoModal';
import DataRow from './DataTable/DataRow';
import DataTable from './DataTable/DataTable';
import NavDropdown from './Dropdowns/NavDropdown';
import Goal from './Goals/Goal';
import Modal, { ModalSize } from './Modal';
import NavGroup from './NavGroup/NavGroup';
import PhotoUpload from './PhotoUpload';
import Sidebar from './Sidebar/Sidebar';
import StaffList from './StaffList/StaffList';
import StaffListItem from './StaffList/StaffListItem';
import { TaskList } from './Tasks/TaskList';
import TaskStep from './Tasks/TaskStep';

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
  .add('RequestDetail', () => (
    <RequestDetail
      onSubmit={() => {}}
      request={{
        id: 1,
        user_id: 1,
        task_id: 1,
        status: select(
          'Status',
          ['NEEDS_ASSISTANCE', 'REPLIED', 'RESOLVED'],
          'NEEDS_ASSISTANCE',
        ),
        messages: [
          {
            id: 1,
            to_user: 1,
            from_user: 1,
            request_id: 1,
            text:
              "I tried calling my credit card but couldn't get through to them",
            timestamp: moment.utc().toISOString(),
          },
        ],
      }}
    />
  ))
  .add('Resolved', () => <Resolved />)
  .add('Sidebar', () => <Sidebar links={[{ to: '', text: '' }]} />)
  .add('Staff List', () => (
    <StaffList
      onUpdateRole={() => {}}
      onResend={() => {}}
      onDelete={() => {}}
      staff={[
        {
          email: 'john@example.com',
          type: USER_TYPE.COACH,
          first_name: 'John',
          last_name: 'Smith',
        },
      ]}
    />
  ))
  .add('Coach Staff List Item', () => (
    <StaffListItem
      onUpdateRole={() => {}}
      onResend={() => {}}
      onDelete={() => {}}
      staffMember={{
        email: 'john@example.com',
        type: USER_TYPE.COACH,
        first_name: 'John',
        last_name: 'Smith',
      }}
    />
  ))
  .add('Admin Staff List Item', () => (
    <StaffListItem
      onUpdateRole={() => {}}
      onResend={() => {}}
      onDelete={() => {}}
      staffMember={{
        email: 'jane@example.com',
        type: USER_TYPE.ADMIN,
        first_name: 'Jane',
        last_name: 'Smith',
      }}
    />
  ))
  .add('Pending Staff List Item', () => (
    <StaffListItem
      onUpdateRole={() => {}}
      onResend={() => {}}
      onDelete={() => {}}
      staffMember={{
        email: 'john@example.com',
        type: USER_TYPE.PENDING_INVITE,
      }}
    />
  ))
  .add('Modal', () => (
    <Modal
      size={select(
        'Size',
        {
          Medium: ModalSize.Medium,
          Large: ModalSize.Large,
          FullWidth: ModalSize.FullWidth,
        },
        ModalSize.Medium,
      )}
    >
      <div>This is a child in a panel.</div>
    </Modal>
  ))
  .add('TermsModal', () => (
    <TermsModal phoneNumber="+15558675309" onClose={() => {}} />
  ))
  .add('VideoModal', () => (
    <VideoModal embedURL="https://www.youtube.com/embed/WpHtdkKQz8Q" />
  ))
  .add('Task Step', () => (
    <TaskStep name="thing" removeField={i => null} count={1} />
  ))
  .add('Task List', () => {
    const match = { url: 'foo' };
    return (
      <TaskList
        match={match}
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
        user={{ id: 1 }}
      />
    );
  })
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
  ))
  .add('User Profile', () => (
    <UserProfile firstName="Jane" lastName="Smith" email="jane@example.com" />
  ))
  .add('Organization Profile', () => (
    <OrganizationProfile name="Organization name" />
  ));

export default Components;
