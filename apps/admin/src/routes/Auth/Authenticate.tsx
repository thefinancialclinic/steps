import React from 'react';
import auth0, { Auth0Service } from 'services/auth0';
import { Redirect, withRouter } from 'react-router-dom';
import api from 'api';
import { bindActionCreators } from 'redux';
import { setAuthenticatedUser } from 'actions/auth';
import { connect } from 'react-redux';
import { AxiosInstance } from 'axios';
import AuthLayout from 'layouts/AuthLayout';
import Panel from 'atoms/Panel';

interface Props {
  actions: { setAuthenticatedUser: Function };
  auth0?: Auth0Service;
  api?: AxiosInstance;
}

interface State {
  authFinished: boolean;
  message: string;
}

export class Authenticate extends React.Component<Props, State> {
  static defaultProps = {
    auth0: auth0,
    api: api,
  };

  constructor(props) {
    super(props);
    this.state = {
      authFinished: false,
      message: '',
    };
    this.onAppTokenSet = this.onAppTokenSet.bind(this);
  }

  async componentDidMount() {
    try {
      await this.props.auth0.authenticate();
      this.onAppTokenSet();
    } catch (err) {
      console.log(err);
      this.props.auth0.logout();
      this.setState({ authFinished: true });
    }
  }

  async onAppTokenSet() {
    this.addAppTokenToAuthHeader();
    this.getAuthenticatedUser();
  }

  addAppTokenToAuthHeader() {
    const { auth0, api } = this.props;
    const apiToken = auth0.getAppToken();
    api.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
  }

  async getAuthenticatedUser() {
    try {
      const { api } = this.props;
      const user = await api.get('/user');
      this.props.actions.setAuthenticatedUser(user.data);
      this.setState({ authFinished: true });
    } catch (err) {
      this.setState({ message: err.toString() });
    }
  }

  render() {
    return (
      <AuthLayout>
        {this.state.authFinished ? (
          <Redirect to="/" />
        ) : (
          <Panel>
            Logging in...
            {this.state.message}
          </Panel>
        )}
      </AuthLayout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setAuthenticatedUser }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Authenticate));
