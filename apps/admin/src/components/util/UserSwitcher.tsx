import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Field } from 'react-final-form';
import Button from 'atoms/Buttons/Button';

import { login } from 'actions/auth';
import { USER_TYPE } from 'reducers/auth';

import { white, black } from 'styles/colors';

const connectField = (handleSubmit, type) => Component => props => {
  return <Component {...props} handleSubmit={handleSubmit} value={type} />;
};

const RadioField: React.SFC<any> = ({ handleSubmit, userType, value }) => {
  const submitter = () => handleSubmit(userType);

  return (
    <label>
      <input
        type="radio"
        value={userType}
        name="user_type"
        onChange={submitter}
        checked={value === userType}
      />{' '}
      {userType}
    </label>
  );
};

class UserSwitcher extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = { show: false };
  }

  toggleDisplay = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { type } = this.props;

    if (this.state.show) {
      const ConnectedField = connectField(this.props.actions.login, type)(
        RadioField,
      );
      return (
        <Wrapper>
          <h1>Login</h1>
          <ConnectedField userType={USER_TYPE.SUPER_ADMIN} />
          <ConnectedField userType={USER_TYPE.ADMIN} />
          <ConnectedField userType={USER_TYPE.COACH} />
          <ConnectedField userType={USER_TYPE.CLIENT} />
          <ConnectedField userType={'null'} />
          <button onClick={this.toggleDisplay}>hide</button>
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
