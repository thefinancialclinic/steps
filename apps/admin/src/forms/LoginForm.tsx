import Button from 'atoms/Buttons/Button';
import React from 'react';
import { Field, Form } from 'react-final-form';
import { USER_TYPE } from 'reducers/auth';
import styled from 'styled-components';
import Text from 'components/Form/Text';

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

class LoginForm extends React.Component<any, any> {
  render() {
    const { onSubmit } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Text name="user_email" label="Email" autoComplete="email" />
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

export default LoginForm;
