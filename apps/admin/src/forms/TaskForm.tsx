import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { grey, lightGrey } from 'styles/colors';
import Badge from 'atoms/Badge';
import Button from 'atoms/Buttons/Button';
import Text from 'components/Form/Text';
import Panel from 'atoms/Panel';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Task } from 'reducers/tasks';
import TaskStep from 'components/Tasks/TaskStep';
import Label from 'atoms/Label';
import { remCalc } from 'styles/type';

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
                <Box width={[1]}>
                  <Text name="title" label="Task" grey />
                </Box>
                <Box width={[1]}>
                  <Text name="description" label="Why This Matters" grey />
                </Box>
              </Flex>

              <Label grey>STEPS</Label>

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
                      <Box width={1} mb={10} mt={-10}>
                        <div className="add-step-link" onClick={addStep}>
                          <div />
                          <Label grey>Add a step</Label>
                          <div />
                        </div>
                      </Box>
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
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: stretch;
    padding-bottom: ${remCalc(20)};
    padding-top: ${remCalc(20)};
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;

    label {
      cursor: pointer;
      margin: 0 ${remCalc(10)};
    }

    > div {
      background-color: ${lightGrey};
      display: block;
      height: 1px;
      flex: 1;
    }

    a {
      color: ${grey};
      text-decoration: none;
    }
  }
`;

export default TaskForm;
