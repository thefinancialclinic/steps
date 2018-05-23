import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { green, grey, white } from 'styles/colors';
import Badge from 'atoms/Badge';
import Button from 'atoms/Button'
import { Link } from 'react-router-dom';
import Panel from 'atoms/Panel';
import StackedInputRow from 'components/Forms/StackedInputRow';


interface Props {
  className?: string;
  badgeText: string;
  children: any;
}

class TaskForm extends React.Component<Props, {}> {

  render() {
    const { className, badgeText, children } = this.props;

    return (
      <div className={className}>
        <Panel>
          <Box><Badge className='task-badge' text={badgeText}></Badge></Box>
          <form>
            <StackedInputRow type='text' label='Task'/>
            <StackedInputRow type='text' label='Why This Matters'/>

          </form>
          {children}

          {/* TODO: What happens when this is clicked? */}
          <div className='add-step-link'><Link to='/'>Add a step</Link></div>
          <Flex justifyContent='center'><Button>SAVE TO WORKPLAN</Button></Flex>
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

    &:before, &:after {
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
