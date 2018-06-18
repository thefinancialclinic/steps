import { storiesOf } from '@storybook/react';
import FollowUpForm from './FollowUpForm';
import React from 'react';

export const Forms = storiesOf('Forms', module).add('Follow Up Form', () => (
  <FollowUpForm onSubmit={() => {}} />
));

export default Forms;
