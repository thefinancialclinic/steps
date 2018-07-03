import React from 'react';
import Authenticate from 'routes/Auth/Authenticate';

interface State {
  nonceSet: boolean;
}

export class MagicLinkAuth extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      nonceSet: false,
    };
  }

  componentWillMount() {
    window.localStorage.setItem(
      'com.auth0.auth.state',
      JSON.stringify({
        nonce: 'nonce',
        state: 'state',
      }),
    );
    this.setState({ nonceSet: true });
  }

  render() {
    return this.state.nonceSet ? <Authenticate redirect="/my-tasks" /> : null;
  }
}
