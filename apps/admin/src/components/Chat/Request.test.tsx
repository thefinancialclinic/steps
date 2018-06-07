import { shallow } from 'enzyme';
import { Request } from './Request';
import * as React from 'react';
import 'jest';

const date = new Date();

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

  it('shows date', () => {
    const wrapper = shallow(
      <Request status="NEEDS_ASSISTANCE" message="I need help" date={date} />,
    );

    expect(wrapper.find('.date').text()).toBe(date.toLocaleDateString());
  });
});
