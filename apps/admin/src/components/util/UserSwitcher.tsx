import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from 'actions/auth';
import { white, black } from 'styles/colors';
import LoginForm from 'forms/LoginForm';

class UserSwitcher extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { show: false };
  }

  private onSubmit = async ({ user_type, user_email }) => {
    await this.props.actions.login(user_type, user_email);
  };

  toggleDisplay = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { type } = this.props;

    if (this.state.show) {
      return (
        <Wrapper>
          <LoginForm onSubmit={this.onSubmit} />
          <a href="#" onClick={this.toggleDisplay}>
            hide user switcher
          </a>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <a href="#" onClick={this.toggleDisplay}>
          show user switcher
        </a>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: ${white};
  box-shadow: 0 0 6px ${black};
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 10px;
  padding: 20px;
  left: 10px;
  z-index: 1000;

  button {
    margin: 10px 0;
  }

  input {
    margin-right: 10px;
  }

  label {
    margin-bottom: 10px;
  }
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
)(UserSwitcher);
