import { signup, getOrg } from 'actions/auth';
import { addAlert } from 'actions/alerts';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';
import CoachSignupForm from 'forms/CoachSignupForm';
import Panel from 'atoms/Panel';
import { grey, green } from 'styles/colors';
import { USER_TYPE } from 'reducers/auth';
import { Flex, Box } from 'grid-styled';
import { AlertLevel } from 'components/Alert/types';

class CoachSignup extends React.Component<any, any> {
  private onSubmit = async ({ first_name, last_name, email, password }) => {
    const user_attrs = {
      first_name,
      last_name,
      email,
      password,
      org_id: this.props.match.params.orgId,
    };
    try {
      await this.props.actions.signup(USER_TYPE.COACH, user_attrs);
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
        <CoachSignupForm onSubmit={this.onSubmit} />
        <p className="login">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </FormContainer>
    );
  }
}

const OrgInfo: React.SFC<any> = ({ org }) => {
  if (org) {
    const { logo, name } = org;
    return (
      <OrgLogo logo={logo}>
        <Flex>
          {logo ? (
            <Box>
              <div className="logo" />
            </Box>
          ) : null}
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            className="name"
          >
            {name}
          </Flex>
        </Flex>
      </OrgLogo>
    );
  } else {
    return null;
  }
};

const OrgLogo = styled<any, 'div'>('div')`
  margin: 3em 0;
  text-align: left;
  color: ${grey};
  .logo {
    width: 90px;
    height: 90px;
    background-image: url(${props => props.logo});
    background-size: contain;
    background-repeat: no-repeat;
  }
  .name {
    margin-left: ${props => (props.logo ? '1em' : '0')};
  }
`;

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
  a {
      color: ${green};
      text-decoration: none;
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
  .login {
    text-align: center;
  }
`;

const mapStateToProps = state => ({
  org: state.auth.org,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ signup, getOrg, addAlert }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CoachSignup));
