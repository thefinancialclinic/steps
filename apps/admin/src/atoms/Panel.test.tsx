import Panel from './Panel';
import { shallow } from 'enzyme';
import * as React from 'react';
import 'jest';

describe('Panel.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Panel>My Panel Content</Panel>);

    expect(wrapper).toBeDefined();
  });
});
