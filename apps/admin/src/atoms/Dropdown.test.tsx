import React from 'react';
import 'jest';
import { shallow } from 'enzyme';

import { Dropdown } from './Dropdown';

it('is closed by default', () => {
  const dropdown = shallow(<Dropdown title="My Rad Dropdown" />);
  expect(dropdown.state('open')).toBe(false);
});

it('opens and closes on click', () => {
  const dropdown = shallow(<Dropdown title="My Rad Dropdown" />);
  const toggle = dropdown.find('.dropdown-toggle');
  toggle.simulate('click');
  expect(dropdown.state('open')).toBe(true);
  toggle.simulate('click');
  expect(dropdown.state('open')).toBe(false);
});

it('displays dropdown title with closed caret', () => {
  const dropdown = shallow(<Dropdown title="My Rad Dropdown" />);
  const toggle = dropdown.find('.dropdown-toggle');
  expect(toggle.text()).toBe('My Rad Dropdown \u25BE');
});

it('hides dropdown items by default', () => {
  const dropdown = shallow(<Dropdown title="My Rad Dropdown" />);
  expect(dropdown.find('.dropdown-content').exists()).toBe(false);
});

it('shows dropdown items when open', () => {
  const dropdown = shallow(<Dropdown title="My Rad Dropdown" />);
  const toggle = dropdown.find('.dropdown-toggle');
  toggle.simulate('click');
  expect(dropdown.find('.dropdown-content').exists()).toBe(true);
});

it('shows each dropdown item when open', () => {
  const dropdown = shallow(
    <Dropdown title="My Rad Dropdown">
      <a className="item-one" />
      <a className="item-two" />
    </Dropdown>,
  );
  const toggle = dropdown.find('.dropdown-toggle');
  toggle.simulate('click');
  expect(dropdown.find('.item-one').exists()).toBe(true);
  expect(dropdown.find('.item-two').exists()).toBe(true);
  expect(dropdown.find('.item-three').exists()).toBe(false);
});
