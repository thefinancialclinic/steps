import { shallow } from 'enzyme';
import { Request, Message } from './Request';
import * as React from 'react';
import 'jest';
import moment from 'moment';
import DateDisplay from '../../atoms/DateDisplay';
import Status from '../../atoms/Status';

const date = moment.utc(new Date(2018, 5, 7));

describe('Request', () => {
  it('shows message', () => {
    const wrapper = shallow(
      <Request status="NEEDS_ASSISTANCE" message="I need help" date={date} />,
    );

    expect(
      wrapper
        .find(Message)
        .dive()
        .text(),
    ).toBe('I need help');
  });

  xit('renders correctly', () => {
    const wrapper = shallow(
      <Request status="NEEDS_ASSISTANCE" message="I need help" date={date} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('has a date', () => {
    const wrapper = shallow(
      <Request status="NEEDS_ASSISTANCE" message="I need help" date={date} />,
    );

    expect(wrapper.find(DateDisplay)).toHaveLength(1);
  });

  it('has a status', () => {
    const wrapper = shallow(
      <Request status="NEEDS_ASSISTANCE" message="I need help" date={date} />,
    );

    const status = wrapper.find(Status);

    expect(status).toHaveLength(1);
    expect(
      status
        .dive()
        .dive()
        .text(),
    ).toEqual('Needs assistance');
  });
});
