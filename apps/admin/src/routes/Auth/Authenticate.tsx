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
import { addAlert } from 'actions/alerts';
import { AlertLevel } from 'components/Alert/types';

interface Props {
  actions: {
    setAuthenticatedUser: Function;
    addAlert: Function;
  };
  auth0?: Auth0Service;
  api?: AxiosInstance;
  redirect?: string;
}

interface State {
  authFinished: boolean;
}

export class Authenticate extends React.Component<Props, State> {
  static defaultProps = {
    auth0: auth0,
    api: api,
    redirect: '/',
  };

  constructor(props) {
    super(props);
    this.state = {
      authFinished: false,
    };
    this.onAppTokenSet = this.onAppTokenSet.bind(this);
  }

  async componentDidMount() {
    try {
      await this.props.auth0.authenticate();
      this.onAppTokenSet();
    } catch (err) {
      this.failAuth(err);
    }
  }

  async onAppTokenSet() {
    this.addAppTokenToAuthHeader();
    this.getAuthenticatedUser();
  }

  failAuth(err) {
    let message = 'Something went wrong.';
    if (err.response && err.response.status == 404) {
      message = "We can't find a user with your email address.";
    }
    this.props.actions.addAlert({
      id: 'auth-error',
      level: AlertLevel.Error,
      message: message,
    });
    this.props.auth0.logout();
    this.setState({ authFinished: true });
    console.log(err);
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
      this.failAuth(err);
    }
  }

  render() {
    return (
      <AuthLayout>
        {this.state.authFinished ? (
          <Redirect to={this.props.redirect} />
        ) : (
          <Panel>Logging in...</Panel>
        )}
      </AuthLayout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ setAuthenticatedUser, addAlert }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Authenticate));
