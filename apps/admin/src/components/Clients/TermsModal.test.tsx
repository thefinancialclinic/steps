import React from 'react';
import 'jest';
import { shallow } from 'enzyme';

import TermsModal from './TermsModal';

it('displays formatted phone number', () => {
  const terms = shallow(<TermsModal phoneNumber="+16365553226" link="#" />);
  expect(terms.find('address').text()).toBe('(636) 555-3226');
});
