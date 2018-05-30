import ButtonLink from '../ButtonLink';
import { shallow } from 'enzyme';
import * as React from 'react';
import 'jest';

describe('ButtonLink.tsx', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <ButtonLink className="my-button-link-class" to="/my/page">
        My button text
      </ButtonLink>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
