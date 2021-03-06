import Button from 'atoms/Buttons/Button';
import React from 'react';
import { Form } from 'react-final-form';
import styled from 'styled-components';
import Text from 'components/Form/Text';
import Password from 'components/Form/Password';
import { required } from 'forms/validators';

class Auth0LoginForm extends React.Component<any, any> {
  render() {
    const { onSubmit } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Text name="email" label="Email" validate={required} />
            <Password name="password" label="Password" validate={required} />
            <Button type="submit" onClick={invalid ? () => {} : handleSubmit}>
              Log In
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

export default Auth0LoginForm;
