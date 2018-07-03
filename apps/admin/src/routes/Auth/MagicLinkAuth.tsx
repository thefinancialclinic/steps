import React from 'react';
import Authenticate from 'routes/Auth/Authenticate';

export class MagicLinkAuth extends React.Component<{}, {}> {
  componentDidMount() {
    window.localStorage.setItem(
      'com.auth0.auth.state',
      JSON.stringify({
        nonce: 'nonce',
        state: 'state',
      }),
    );
  }

  render() {
    return <Authenticate redirect="/my-tasks" />;
  }
}
