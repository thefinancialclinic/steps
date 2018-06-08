import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import Main from './Main';

describe('Main.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Main>My page content</Main>);

    expect(wrapper).toBeDefined();
  });
});
