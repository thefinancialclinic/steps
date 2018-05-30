import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { green, white, yellow } from 'styles/colors';
import Input from 'atoms/Input';
import Badge from 'atoms/Badge'
import ButtonLink from 'atoms/ButtonLink'
import Panel from 'atoms/Panel';
import StackedInputRow from 'components/Forms/StackedInputRow';

interface Props {
  className?: string;
}

class NoTasks extends React.Component<Props, {}> {

  render() {
    const { className } = this.props;

    return (
      <Box width={1} p={4} className={className}>
        <Panel>
          <div><i className='material-icons'>mood</i></div>
          <div>Profile created!</div>
          <div>Now let's add some tasks.</div>
          <Box m={2}><ButtonLink to='/clients/:id/tasks/add'>Add New Task</ButtonLink></Box>
        </Panel>
      </Box>
    );
  }
}

const StyledNoTasks = styled(NoTasks)`
  text-align: center;
  font-size: 1.5em;
  line-height: 1.5;

  button {
    margin-top: 1em;
  }
  i {
    color: ${yellow};
    font-size: 6em;
  }
`;

export default StyledNoTasks;
