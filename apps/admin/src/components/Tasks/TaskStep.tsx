import { Box, Flex } from 'grid-styled';
import React from 'react';
import styled from 'styled-components';
import { Field } from 'react-final-form';
import { black, green, grey, white } from 'styles/colors';
import { remCalc, sansSerif, serif } from 'styles/type';
import Input from 'atoms/Input/Input';
import { Step } from 'reducers/tasks';
import TaskStepNote from './TaskStepNote';

interface Props {
  className?: string;
  count: number;
  name: string;
  step?: Step;
  removeField: (number) => void;
}

class TaskStep extends React.Component<Props, {}> {
  render() {
    const { className, count, removeField, name, step } = this.props;

    return (
      <Flex className={className} mb={30}>
        <Box mr={20}>
          <Flex className="step-actions" alignItems="center">
            <div className="circle">{count}</div>
            <i
              className="material-icons grey"
              onClick={() => removeField(count - 1)}
            >
              delete
            </i>
          </Flex>
        </Box>
        <Box width={1} className="step-text">
          <Field name={`${name}.task_id`} component="text" />
          <Field name={`${name}.text`}>
            {({ input }) => (
              <Input
                type="textarea"
                {...input}
                defaultValue={step ? step.text : ''}
              />
            )}
          </Field>
          {step.note && <TaskStepNote text={step.note} />}
        </Box>
      </Flex>
    );
  }
}

const StyledTaskStep = styled(TaskStep)`
  background: ${white};

  .step-actions {
    flex-direction: column;
    text-align: center;
    height: 100%;
  }

  .circle {
    align-items: center;
    background-color: ${green};
    border-radius: 50%;
    color: ${white};
    display: flex;
    font-family: ${sansSerif};
    height: ${remCalc(50)};
    justify-content: center;
    margin-bottom: ${remCalc(20)};
    text-align: center;
    width: ${remCalc(50)};
  }

  i.material-icons.grey {
    color: ${grey};
    cursor: pointer;
  }

  .step-text {
    > div {
      width: 100%;
    }
  }

  input,
  textarea {
    color: ${black};
    font-family: ${serif};
  }
`;

export default StyledTaskStep;
