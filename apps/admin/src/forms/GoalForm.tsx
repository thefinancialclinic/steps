import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import Textarea from 'components/Form/Textarea';
import { Goal } from 'components/Goals/types';
import { Flex } from 'grid-styled';
import React from 'react';
import { Form } from 'react-final-form';

interface Props {
  onSubmit: (goal: Goal) => void;
  goal?: Goal;
}

const GoalForm: React.SFC<Props> = ({ onSubmit, goal }) => (
  <Form
    initialValues={{ goal: goal && goal.text }}
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>{goal ? 'Edit Goal' : 'Add New Goal'}</h2>
        <Panel>
          <Textarea name="goal" placeholder="My goal is to..." label="goal" />
          <Flex justifyContent="center">
            <Button>Save</Button>
          </Flex>
        </Panel>
      </form>
    )}
  />
);

export default GoalForm;
