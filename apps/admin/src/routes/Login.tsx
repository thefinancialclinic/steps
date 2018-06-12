import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Field } from 'react-final-form';

import Button from 'atoms/Buttons/Button';
import { login } from 'actions/auth';
import { USER_TYPE } from 'reducers/auth';

import { white, black } from 'styles/colors';

const RadioField: React.SFC<any> = ({ userType }) => (
  <Field name="user_type" type="radio" value={userType}>
    {({ input }) => (
      <label>
        <input {...input} type="radio" value={userType} name="user_type" />{' '}
        {userType}
      </label>
    )}
  </Field>
);

class Login extends React.Component<any, any> {
  private onSubmit = ({ user_type }) => {
    this.props.actions.login(user_type);
  };

  render() {
    const { type } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <h1>Login</h1>
            <RadioField userType={USER_TYPE.SUPER_ADMIN} />
            <RadioField userType={USER_TYPE.ADMIN} />
            <RadioField userType={USER_TYPE.COACH} />
            <RadioField userType={USER_TYPE.CLIENT} />
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </StyledForm>
        )}
      />
    );
  }
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    line-height: 1.2rem;
  }

  input[type='checkbox'] {
    margin-right: 0.5rem;
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
)(Login);
