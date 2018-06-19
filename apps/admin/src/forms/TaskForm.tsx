import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { grey } from 'styles/colors';
import Badge from 'atoms/Badge';
import Button from 'atoms/Buttons/Button';
import Text from 'components/Form/Text';
import Panel from 'atoms/Panel';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Task } from 'reducers/tasks';
import TaskStep from 'components/Tasks/TaskStep';

interface Props {
  user: any;
  onSubmit: any;
  task?: Task;
}

const defaultStep = {
  task_id: null,
  text: '',
  note: null,
};

class TaskForm extends React.Component<Props, null> {
  static defaultProps = {
    task: {
      steps: [null],
    },
  };

  private addStep = fields => {
    fields.push({ task_id: this.props.task.id });
  };

  render() {
    const { onSubmit, task } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        initialValues={task}
        mutators={{ ...arrayMutators }}
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

              <FieldArray name="steps">
                {({ fields }) => {
                  const addStep = this.addStep.bind(this, fields);

                  return (
                    <div>
                      {fields.map((name, index) => (
                        <TaskStep
                          name={name}
                          key={name}
                          count={index + 1}
                          step={{
                            ...fields.value[index],
                            task_id: task.id || null,
                          }}
                          removeField={fields.remove}
                        />
                      ))}
                      <div className="add-step-link" onClick={addStep}>
                        Add a step
                      </div>
                    </div>
                  );
                }}
              </FieldArray>

              {/* TODO: What happens when this is clicked? */}
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
