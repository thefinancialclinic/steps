import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { green } from 'styles/colors';
import Badge from 'atoms/Badge';
import Button from 'atoms/Button'
import Panel from 'atoms/Panel';
import StackedInputRow from 'components/Forms/StackedInputRow';

interface Props {
  className?: string;
  badgeText: string;
}

class TaskForm extends React.Component<Props, {}> {

  render() {
    const { className, badgeText } = this.props;

    return (
      <div className={className}>
        <Panel>
          <Box><Badge className='task-badge' text={badgeText}></Badge></Box>
          <form>
            <StackedInputRow type='text' label='Task'/>
            <StackedInputRow type='text' label='Why This Matters'/>
            <Flex justifyContent='center'><Button>SAVE TO WORKPLAN</Button></Flex>
          </form>
        </Panel>
      </div>
    );
  }
}

const StyledTaskForm = styled(TaskForm)`
  .task-badge {
    margin-bottom: 1em;
  }
`;


export default StyledTaskForm;
