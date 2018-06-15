import { shallow } from 'enzyme';
import RequestDetail from './RequestDetail';
import * as React from 'react';
import 'jest';

describe('RequestDetail', () => {
  it('shows message', () => {
    const wrapper = shallow(<RequestDetail />);
  });
});
