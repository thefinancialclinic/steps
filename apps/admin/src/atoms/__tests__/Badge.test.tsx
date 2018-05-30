import Badge from '../Badge';
import { shallow } from 'enzyme';
import * as React from 'react';
import 'jest';

describe('Badge.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Badge text="badge text" className="my-class-name" />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
