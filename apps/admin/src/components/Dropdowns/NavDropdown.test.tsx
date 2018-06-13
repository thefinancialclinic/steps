import React from 'react';
import 'jest';
import { shallow } from 'enzyme';

import { NavDropdown, LinkList } from './NavDropdown';

it('displays a NavLink for each global link', () => {
  const dropdown = shallow(<NavDropdown title="Some title" />);
  const globalLinks = dropdown
    .find('.global-links')
    .shallow()
    .find('NavLink');
  expect(globalLinks).toHaveLength(2);
});

it('displays a NavLink for each contextual link', () => {
  const dropdown = shallow(
    <NavDropdown
      title="Some title"
      links={[{ to: '/one', text: 'One' }, { to: '/two', text: 'Two' }]}
    />,
  );
  const contextualLinks = dropdown
    .find('.contextual-links')
    .shallow()
    .find('NavLink');
  expect(contextualLinks).toHaveLength(2);
});
