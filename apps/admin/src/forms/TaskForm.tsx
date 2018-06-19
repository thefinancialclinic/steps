import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { grey, mediumBlue } from 'styles/colors';
import Badge from 'atoms/Badge';
import Button from 'atoms/Buttons/Button';
import Text from 'components/Form/Text';
import { Link } from 'react-router-dom';
import Panel from 'atoms/Panel';
import { Form } from 'react-final-form';
import TaskStep from 'components/Tasks/TaskStep';
import api from 'api';

interface Props {
  user: any;
  onSubmit: any;
  task?: any;
}

class TaskForm extends React.Component<Props, {}> {
  render() {
    const { children, onSubmit, task } = this.props;

    const steps = task.steps ? (
      task.steps.map((item, index) => (
        <TaskStep count={index + 1} step={item} key={index} />
      ))
    ) : (
      <TaskStep count={1} />
    );

    return (
      <Form
        onSubmit={onSubmit}
        initialValues={task}
        render={({ handleSubmit }) => (
          <StyledTaskForm onSubmit={handleSubmit}>
            <Panel>
              <Box>
                <Badge
                  className="task-badge"
                  text={task && task.category ? task.category : 'custom'}
                />
              </Box>
              <Flex flexWrap="wrap">
                <Box width={[1]} px={2}>
                  <Text name="title" label="Task" />
                </Box>
                <Box width={[1]} px={2}>
                  <Text name="description" label="Why This Matters" />
                </Box>
              </Flex>

              <label>STEPS</label>

              {steps}

              {/* TODO: What happens when this is clicked? */}
              <div className="add-step-link">
                <Link to="/">Add a step</Link>
              </div>
              <Flex justifyContent="center">
                <Button type="submit">SAVE TO WORKPLAN</Button>
              </Flex>
            </Panel>
          </StyledTaskForm>
        )}
      />
    );
  }
}

const StyledTaskForm = styled.form`
  .task-badge {
    margin-bottom: 1em;
  }
  .add-step-link {
    display: table;
    margin: 1em 0;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;

    &:before,
    &:after {
      border-top: 1px solid ${grey};
      content: '';
      display: table-cell;
      position: relative;
      top: 0.5em;
      width: 45%;
    }
    &:before {
      right: 1.5%;
    }
    &:after {
      left: 1.5%;
    }
    a {
      color: ${grey};
      text-decoration: none;
    }
  }
`;

export default TaskForm;
