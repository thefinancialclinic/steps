import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import { Flex } from 'grid-styled';
import { DateProvider, DefaultDateProvider } from 'helpers';
import moment from 'moment';
import React from 'react';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';
import { green, pink } from 'styles/colors';
import { remCalc } from 'styles/type';

interface Props {
  onSubmit: (data: { weeks: number }) => void;
  saved: boolean;
  followUpDate?: moment.Moment;
  dateProvider?: DateProvider;
}

const FollowUpForm: React.SFC<Props> = ({
  onSubmit,
  saved,
  followUpDate,
  dateProvider = new DefaultDateProvider(),
}) => {
  const yesterday = dateProvider.today().subtract(1, 'day');
  const weeks = followUpDate
    ? followUpDate.diff(yesterday, 'weeks')
    : undefined;
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ weeks: weeks }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Flex justifyContent="center">
            <Saved>{saved ? 'Saved!' : ''}</Saved>
          </Flex>
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
};

const Saved = styled.div`
  color: ${green};
  height: ${remCalc(22)};
  font-size: ${remCalc(18)};
  margin: 1rem;
`;

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
