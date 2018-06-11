import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { green, grey, white, black, mediumBlue } from 'styles/colors';
import { remCalc } from 'styles/type';
import Badge from 'atoms/Badge';
import Button from 'atoms/Buttons/Button';
import Input from 'atoms/Input/Input';
import { Link } from 'react-router-dom';
import Panel from 'atoms/Panel';
import TaskStep from './TaskStep';

interface Props {
  className?: string;
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
  render() {
    const { className, children, task } = this.props;

    const steps = task.steps ? (
      task.steps.map((item, index) => (
        <TaskStep count={index + 1} step={item} />
      ))
    ) : (
      <TaskStep count={1} />
    );

    return (
      <div className={className}>
        <Panel>
          <Box>
            <Badge
              className="task-badge"
              text={task && task.category ? task.category : 'custom'}
            />
          </Box>
          <form>
            <BaseInputRow>
              <label>Task</label>
              <input
                type="text"
                defaultValue={task && task.title ? task.title : ''}
              />
            </BaseInputRow>
            <BaseInputRow>
              <label>Why This Matters</label>
              <input
                type="text"
                defaultValue={task && task.description ? task.description : ''}
              />
            </BaseInputRow>
          </form>
          <label>STEPS</label>

          {steps}

          {/* TODO: What happens when this is clicked? */}
          <div className="add-step-link">
            <Link to="/">Add a step</Link>
          </div>
          <Flex justifyContent="center">
            <Button>SAVE TO WORKPLAN</Button>
          </Flex>
        </Panel>
      </div>
    );
  }
}

const StyledTaskForm = styled(TaskForm)`
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

export default StyledTaskForm;
