import React from 'react';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import Panel from 'atoms/Panel';
import { Flex, Box } from 'grid-styled';
import Button from 'atoms/Buttons/Button';
import { remCalc } from 'styles/type';
import { pink, green } from 'styles/colors';

interface Props {
  onSubmit: (data: { weeks: number }) => void;
}

const FollowUpForm: React.SFC<Props> = ({ onSubmit }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Panel>
          <Flex flexDirection="column" alignItems="center">
            <CalendarIcon className="material-icons">
              calendar_today
            </CalendarIcon>
            <StyledText>
              Let's follow up in
              <Field name="weeks">
                {({ input }) => <NumberInput {...input} />}
              </Field>
              weeks.
            </StyledText>
            <Button>Save</Button>
          </Flex>
        </Panel>
      </form>
    )}
  />
);

const CalendarIcon = styled.i`
  font-size: ${remCalc(50)};
  color: ${pink};
`;

const StyledText = styled.div`
  font-size: ${remCalc(64)};
  margin-bottom: 1rem;
  text-align: center;
`;

const NumberInput = styled.input`
  border: none;
  border-bottom: 2px solid ${green};
  color: ${green};
  font-size: ${remCalc(64)};
  margin: 0 0.5rem;
  outline: none;
  text-align: center;
  width: ${remCalc(50)};
`;

export default FollowUpForm;
