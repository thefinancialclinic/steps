import React from 'react';
import auth0 from 'services/auth0';
import { Redirect } from 'react-router-dom';
import api from 'api';
import { bindActionCreators } from 'redux';
import { setUser } from 'actions/auth';
import { connect } from 'react-redux';

interface Props {
  actions: any;
}

interface State {
  sessionTokenIsSet: boolean;
}

class Authenticate extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      sessionTokenIsSet: false,
    };
    this.onSessionTokenSet = this.onSessionTokenSet.bind(this);
  }

  componentDidMount() {
    auth0.authenticate(this.onSessionTokenSet);
  }

  async onSessionTokenSet() {
    const apiToken = localStorage.getItem('access_token');
    api.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
    const user = await api.get('/user');
    this.props.actions.setUser(user.data);
    this.setState({ sessionTokenIsSet: true });
  }

  render() {
    return this.state.sessionTokenIsSet ? (
      <Redirect to="/" />
    ) : (
      <div>
        <h1>Logging in...</h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setUser }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(Authenticate);
