import { login } from 'actions/auth';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import LoginForm from 'forms/LoginForm';
import { svgBackgroundImageUrl } from 'styles';
import Panel from 'atoms/Panel';
import { darkBlue } from 'styles/colors';

class Login extends React.Component<any, any> {
  private onSubmit = async ({ user_type, user_email }) => {
    await this.props.actions.login(user_type, user_email);
    this.props.history.push('/');
  };

  render() {
    return (
      <Flex flexWrap="wrap">
        <Box width={[1, 3 / 4]}>
          <Header>A brighter financial future starts today</Header>
          <BackgroundImage />
        </Box>
        <Box width={[1, 1 / 4]}>
          <FormContainer>
            <h1>Log In</h1>
            <LoginForm onSubmit={this.onSubmit} />
          </FormContainer>
        </Box>
      </Flex>
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

const Header = styled.h1`
  padding: 0 1em;
  text-align: center;
  font-size: 72px;
  font-weight: 600;
  color: ${darkBlue};
`;

const BackgroundImage = styled.div`
  height: 626px;
  width: 825px;
  max-height: 100%;
  max-width: 100%;
  background-image: ${svgBackgroundImageUrl('login-bg.svg')};
  background-size: contain;
  background-repeat: no-repeat;
`;

const mapStateToProps = state => ({
  type: state.auth.user.type,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ login }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Login));
