import { signup } from 'actions/auth';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';
import AdminSignupForm from 'forms/AdminSignupForm';
import Panel from 'atoms/Panel';
import { grey, green } from 'styles/colors';
import { USER_TYPE } from 'reducers/auth';
import { addAlert } from 'actions/alerts';
import { AlertLevel } from 'components/Alert/types';

class AdminSignup extends React.Component<any, any> {
  private onSubmit = async ({
    first_name,
    last_name,
    organization_name,
    email,
    password,
  }) => {
    const user_attrs = {
      first_name,
      last_name,
      organization_name,
      email,
      password,
    };
    try {
      await this.props.actions.signup(USER_TYPE.ADMIN, user_attrs);
    } catch (err) {
      this.props.actions.addAlert({
        message: err.message,
        level: AlertLevel.Error,
        id: err.message,
      });
    }
  };

  render() {
    return (
      <FormContainer>
        <h1>Sign Up</h1>
        <p>
          Welcome to the pilot! If you are an administrator, please sign up
          below to get your organization started.
        </p>
        <AdminSignupForm onSubmit={this.onSubmit} />
        <p className="log-in">
          Already have an account? <Link to="/">Log In</Link>
        </p>
      </FormContainer>
    );
  }
}

const FormContainer = styled(Panel)`
  height: 100%;
  padding: 1em 2em;
  h1 {
    font-size: 50px;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    color ${grey};
    margin-bottom: 1em;
  }
  button {
    margin: 1em 0;
  }
  input {
    margin: 0.5em 0;
  }
  label {
    margin: 0 0.5em;
  }
  a {
    color: ${green};
    text-decoration: none;
  }
  .log-in {
    text-align: center;
  }
`;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ signup, addAlert }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(AdminSignup));
