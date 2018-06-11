import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import Header from './Header';

describe('Header.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Header>
        <h1>Some header content</h1>
      </Header>,
    );

    expect(wrapper).toBeDefined();
  });
});
