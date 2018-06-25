import Button from 'atoms/Buttons/Button';
import React from 'react';
import { Form } from 'react-final-form';
import styled from 'styled-components';
import Text from 'components/Form/Text';
import Password from 'components/Form/Password';

class SignupForm extends React.Component<any, any> {
  render() {
    const { onSubmit } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Text name="first_name" label="First" />
            <Text name="last_name" label="Last" />
            <Text name="organization_name" label="Organization's Name" />
            <Text name="email" label="Email" />
            <Password name="password" label="Password" />
            <Button type="submit" onClick={handleSubmit}>
              Sign Up
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

export default SignupForm;
