import { Box, Flex } from 'grid-styled';
import React from 'react';
import styled from 'styled-components';
import { Field } from 'react-final-form';
import { green, white } from 'styles/colors';
import Input from 'atoms/Input/Input';
import { Step } from 'reducers/tasks';

interface Props {
  className?: string;
  count: number;
  name: string;
  step?: Step;
  taskId: number;
}

class TaskStep extends React.Component<Props, {}> {
  render() {
    const { className, count, name, step, taskId } = this.props;

    return (
      <Flex className={className}>
        <Box width={1 / 8}>
          <Flex className="step-actions">
            <Box width={1} mb={1}>
              <div className="circle">{count}</div>
            </Box>
            <Box width={1} mt={1}>
              &nbsp;X
            </Box>
          </Flex>
        </Box>
        <Box width={7 / 8} className="step-text">
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
        </Box>
      </Flex>
    );
  }
}

const StyledTaskStep = styled(TaskStep)`
  padding: 1em;
  background: ${white};

  .step-actions {
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
  .circle {
    background-color: ${green};
    border-radius: 50%;
    color: ${white};
    display: table-cell;
    height: 24px;
    text-align: center;
    vertical-align: middle;
    width: 24px;
  }
  .step-text {
    > div {
      width: 100%;
    }
  }
`;

export default StyledTaskStep;
