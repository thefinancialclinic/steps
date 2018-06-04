import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'grid-styled';
import { green } from 'styles/colors';
import Panel from 'atoms/Panel';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: ${green};
  font-size: .8em;
  margin-top: .5em;
  text-decoration: none;
  text-transform: uppercase;
`;

export default task => {

  const toggleTaskStatus = (e) => {
    //TODO: this should update task status
  };

  return (
    <Panel shadow>
      <Flex alignItems='flex-start'>
        <Box pr={3}>
          <input type='checkbox' value={task.status} checked={task.status === 'COMPLETED'} onClick={toggleTaskStatus} />
        </Box>
        <Box>
          <div>{task.value}</div>
          <StyledLink to={`/clients/${task.userId}/tasks/${task.id}`}>View Details</StyledLink>
        </Box>
      </Flex>
    </Panel>
  )
};
