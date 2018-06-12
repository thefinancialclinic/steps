import { shallow } from 'enzyme';
import { Request } from './Request';
import * as React from 'react';
import 'jest';
import moment from 'moment';

const date = moment.utc(new Date(2018, 5, 7));

describe('Request', () => {
  it('shows request status', () => {
    const wrapper = shallow(
      <Request status="NEEDS_ASSISTANCE" message="I need help" date={date} />,
    );

    expect(wrapper.find('.status').text()).toBe('Needs assistance');
  });

  it('shows message', () => {
    const wrapper = shallow(
      <Request status="NEEDS_ASSISTANCE" message="I need help" date={date} />,
    );

    expect(wrapper.find('.message').text()).toBe('I need help');
  });

  it('formats date', () => {
    const wrapper = shallow(
      <Request status="NEEDS_ASSISTANCE" message="I need help" date={date} />,
    );

    expect(wrapper.find('.date').text()).toBe(date.format('YYYY-M-D'));
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <Request status="NEEDS_ASSISTANCE" message="I need help" date={date} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
