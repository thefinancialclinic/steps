import React from 'react';

import Button from 'atoms/Buttons/Button';
import auth0 from 'services/auth0';

const LoginButton: React.SFC = () => (
  <Button onClick={auth0.login}>Log In</Button>
);

export default LoginButton;
