import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import Subtext from './Subtext';

describe('Subtext.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Subtext>
        <p>My text</p>
      </Subtext>,
    );

    expect(wrapper).toBeDefined();
  });
});
