import { login } from 'actions/auth';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';
import LoginForm from 'forms/LoginForm';
import Panel from 'atoms/Panel';
import auth0 from 'services/auth0';
import Auth0LoginForm from 'forms/Auth0LoginForm';
import { addAlert } from 'actions/alerts';
import { AlertLevel } from 'components/Alert/types';
import AuthLayout from 'layouts/AuthLayout';

class Login extends React.Component<any, any> {
  private onSubmit = async ({ user_type, user_email }) => {
    await this.props.actions.login(user_type, user_email);
    this.props.history.push('/');
  };

  private onAuth0Submit = async ({ email, password }) => {
    try {
      await auth0.login(email, password);
    } catch (err) {
      this.props.actions.addAlert({
        id: err.message,
        level: AlertLevel.Error,
        message: err.message,
      });
    }
  };

  render() {
    return (
      <AuthLayout>
        <FormContainer>
          <h1>Log In</h1>
          {this.props.location.search === '?auth0' ? (
            <Auth0LoginForm onSubmit={this.onAuth0Submit} />
          ) : (
            <LoginForm onSubmit={this.onSubmit} />
          )}
        </FormContainer>
      </AuthLayout>
    );
  }
}

const FormContainer = styled(Panel)`
  height: 100%;
  padding: 2em 2em;
  h1 {
    font-size: 50px;
  }
  button {
    margin: 2em 0;
  }
  input {
    margin: 0.5em 0;
  }
  label {
    margin: 0 0.5em;
  }
`;

const mapStateToProps = state => ({
  type: state.auth.user.type,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ login, addAlert }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Login));
