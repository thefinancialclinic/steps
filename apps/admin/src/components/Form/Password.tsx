import React from 'react';
import Text, { Props } from 'components/Form/Text';

const Password: React.SFC<Props> = props => (
  <Text inputType="password" {...props} />
);

export default Password;
