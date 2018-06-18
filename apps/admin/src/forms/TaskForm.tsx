import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { grey, mediumBlue } from 'styles/colors';
import { remCalc } from 'styles/type';
import Badge from 'atoms/Badge';
import Button from 'atoms/Buttons/Button';
import Text from 'components/Form/Text';
import { Link } from 'react-router-dom';
import Panel from 'atoms/Panel';
import { Field, Form } from 'react-final-form';
import TaskStep from 'components/Tasks/TaskStep';

interface Props {
  client: any;
  task?: any;
}

const BaseInputRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${remCalc(20)};

  label {
    margin-bottom: ${remCalc(5)};
    text-transform: uppercase;
  }

  input {
    border: none;
    background: none;
    box-shadow: 0 0 0 1px ${mediumBlue};
    font-size: ${remCalc(18)};
    padding-bottom: ${remCalc(21)};
    padding-left: ${remCalc(20)};
    padding-right: ${remCalc(20)};
    padding-top: ${remCalc(21)};
    width: 100%;
  }
`;

class TaskForm extends React.Component<Props, {}> {
  onSubmit = values => {
    console.log('hello', values);
  };

  render() {
    const { children, task } = this.props;

    const steps = task.steps ? (
      task.steps.map((item, index) => (
        <TaskStep count={index + 1} step={item} />
      ))
    ) : (
      <TaskStep count={1} />
    );

    return (
      <Form
        onSubmit={this.onSubmit}
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
                  <Text name="task" label="Task" />
                </Box>
                <Box width={[1]} px={2}>
                  <Text
                    name="why"
                    label="Why This Matters"
                    defaultValue={
                      task && task.description ? task.description : ''
                    }
                  />
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
