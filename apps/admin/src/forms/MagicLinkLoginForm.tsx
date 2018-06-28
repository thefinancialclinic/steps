import React from 'react';
import { Form } from 'react-final-form';
import styled from 'styled-components';

import Button from 'atoms/Buttons/Button';
import Text from 'components/Form/Text';
import Password from 'components/Form/Password';
import { required } from 'forms/validators';

class MagicLinkLoginForm extends React.Component<any, any> {
  render() {
    const { onSubmit } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Text name="email" label="Email" validate={required} />
            <Button type="submit" onClick={invalid ? () => {} : handleSubmit}>
              Continue
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
`;

export default MagicLinkLoginForm;
