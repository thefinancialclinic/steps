import React from 'react';
import auth0 from 'services/auth0';
import { Redirect } from 'react-router-dom';
import api from 'api';
import { bindActionCreators } from 'redux';
import { setUser } from 'actions/auth';
import { connect } from 'react-redux';

interface Props {
  actions: { setUser: Function };
}

interface State {
  appTokenIsSet: boolean;
}

class Authenticate extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      appTokenIsSet: false,
    };
    this.onAppTokenSet = this.onAppTokenSet.bind(this);
  }

  componentDidMount() {
    auth0.authenticate(this.onAppTokenSet);
  }

  async onAppTokenSet() {
    const apiToken = auth0.getAppToken();
    api.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
    const user = await api.get('/user');
    this.props.actions.setUser(user.data);
    this.setState({ appTokenIsSet: true });
  }

  render() {
    return this.state.appTokenIsSet ? <Redirect to="/" /> : null;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setUser }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(Authenticate);
