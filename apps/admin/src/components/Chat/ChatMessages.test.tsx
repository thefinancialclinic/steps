import { shallow } from 'enzyme';
import ChatMessages from './ChatMessages';
import * as React from 'react';
import 'jest';
import moment from 'moment';

const media = [];

const fromUser = {
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
};

const user = {
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
};

const messages = [
  {
    id: 1,
    to_user: 1,
    from_user: 2,
    request_id: null,
    timestamp: moment.utc(new Date(2018, 4, 21, 1)),
    text: "Hey there! It's me, Roo. Hoping you're having a great day.",
  },
  {
    id: 2,
    to_user: 1,
    from_user: 2,
    request_id: null,
    timestamp: moment.utc(new Date(2018, 4, 21, 2)),
    text: "Here's a short story that might interest you:",
  },
  {
    id: 3,
    to_user: 1,
    from_user: 2,
    request_id: null,
    timestamp: moment.utc(new Date(2018, 4, 21, 3)),
    text: "If you want to hear more of Tres & Tanya's story, text 1.",
  },
  {
    id: 4,
    to_user: 1,
    from_user: 2,
    request_id: null,
    timestamp: moment.utc(new Date(2018, 4, 22, 4)),
    text:
      "Hi hi! How's it going with finishing your task? Text DONE, HELP, or STILL WORKING",
  },
  {
    id: 5,
    to_user: 2,
    from_user: 1,
    request_id: null,
    timestamp: moment.utc(new Date(2018, 4, 22, 5)),
    text: 'Still working',
  },
  {
    id: 6,
    to_user: 1,
    from_user: 2,
    request_id: null,
    timestamp: moment.utc(new Date(2018, 4, 22, 6)),
    text:
      "Okay, great! If you need any help just text HELP, if you're done, text DONE.",
  },
];

describe('ChatMessages', () => {
  it('chunks messages by date', () => {
    const wrapper = shallow(
      <ChatMessages
        media={media}
        messages={messages}
        fromUser={fromUser}
        user={user}
      />,
    );
    expect(wrapper.instance().groupByDate(messages)).toEqual([
      { date: '2018-05-21T00:00:00Z', messages: messages.slice(0, 3) },
      { date: '2018-05-22T00:00:00Z', messages: messages.slice(3) },
    ]);
  });
});
