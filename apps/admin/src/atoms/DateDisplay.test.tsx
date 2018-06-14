import React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import DateDisplay from './DateDisplay';

describe('DateDisplay.tsx', () => {
  const date = moment.utc('2018-01-01');

  it('is defined', () => {
    const wrapper = shallow(<DateDisplay date={date} />);

    expect(wrapper).toBeDefined();
  });

  it('is properly formatted', () => {
    const wrapper = shallow(<DateDisplay date={date} />);

    expect(wrapper.dive().text()).toEqual('2018-01-01');
  });
});
