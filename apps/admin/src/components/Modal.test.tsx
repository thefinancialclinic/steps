import 'jest';
import { shallow } from 'enzyme';
import Modal from './Modal';
import React from 'react';

describe('Modal.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Modal />);

    expect(wrapper).toBeDefined();
  });
});
