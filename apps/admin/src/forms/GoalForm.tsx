import Button from 'atoms/Buttons/Button';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { Form } from 'react-final-form';
import { Goal } from 'components/Goals/types';
import Textarea from 'components/Form/Textarea';

interface Props {
  onSubmit: (goal: Goal) => void;
  goal?: Goal;
}

const GoalForm: React.SFC<Props> = ({ onSubmit, goal }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>{goal ? 'Edit Goal' : 'Add New Goal'}</h2>
        <Flex flexWrap="wrap">
          <Box width={[1, 1 / 2]} px={2}>
            <Textarea
              name="goal"
              placeholder="My goal is to..."
              label="goal"
              value={goal && goal.text}
            />
          </Box>
        </Flex>
        <Button>Save</Button>
      </form>
    )}
  />
);

export default GoalForm;
