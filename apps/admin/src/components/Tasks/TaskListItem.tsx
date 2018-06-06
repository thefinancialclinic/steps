import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { green } from 'styles/colors';
import Panel from 'atoms/Panel';
import { Link } from 'react-router-dom';
import { setTaskStatus } from 'actions/tasks';
import { Task } from 'reducers/tasks';

const StyledLink = styled(Link)`
  color: ${green};
  font-size: 0.8em;
  margin-top: 0.5em;
  text-decoration: none;
  text-transform: uppercase;
`;

interface Props {
  key: string;
  setTaskStatus;
  index: number;
  task: Task;
}

export default ({ setTaskStatus, task }: Props) => {
  const toggleTaskStatus = e => {
    const status = task.status === 'COMPLETED' ? 'ACTIVE' : 'COMPLETED';
    setTaskStatus(task, status);
  };

  return (
    <Panel shadow>
      <Flex alignItems="flex-start">
        <Box pr={3}>
          <input
            type="checkbox"
            value={task.status}
            checked={task.status === 'COMPLETED'}
            onChange={toggleTaskStatus}
          />
        </Box>
        <Box>
          <div>{task.title}</div>
          <StyledLink to={`/clients/${task.user_id}/tasks/${task.id}`}>
            View Details
          </StyledLink>
        </Box>
      </Flex>
    </Panel>
  );
};
