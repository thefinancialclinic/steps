import { storiesOf } from '@storybook/react';
import FollowUpForm from './FollowUpForm';
import React from 'react';
import { boolean } from '@storybook/addon-knobs';

export const Forms = storiesOf('Forms', module).add('Follow Up Form', () => (
  <FollowUpForm onSubmit={() => {}} saved={boolean('saved', false)} />
));

export default Forms;
