import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import Label from './Label';

describe('Label.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Label>some label content</Label>);

    expect(wrapper).toBeDefined();
  });
});
