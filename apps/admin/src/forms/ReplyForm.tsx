import styled from 'styled-components';
import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import Textarea from 'components/Form/Textarea';
import { Flex } from 'grid-styled';
import React from 'react';
import { Form } from 'react-final-form';
import { grey } from 'styles/colors';
import Status from 'atoms/Status';
import { sansSerif } from 'styles/type';

interface Props {
  onSubmit: (data) => void;
}

const ReplyForm: React.SFC<Props> = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, form }) => {
      const submit = e => {
        handleSubmit(e);
        form.reset();
      };

      return (
        <StyledForm onSubmit={submit}>
          <Panel>
            <Status color={grey}>Reply</Status>
            <Textarea name="reply" />
            <Flex justifyContent="center">
              <Button>Reply</Button>
            </Flex>
          </Panel>
        </StyledForm>
      );
    }}
  />
);

const StyledForm = styled.form`
  border-radius: 4px;
  font-family: ${sansSerif};
  color: ${grey};

  textarea {
    padding: 0;
    min-height: 10em;
    border-radius: 4px;
  }
`;

export default ReplyForm;
