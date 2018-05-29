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

export default props => {

  const toggleTaskStatus = (e) => {

  }

  return (
    <Panel shadow>
      <Flex alignItems='flex-start'>
        <Box pr={3}>
          <input type='checkbox' value={props.status} onClick={toggleTaskStatus} />
        </Box>
        <Box>
          <div>{props.value}</div>
          <StyledLink to={{ pathname: `/clients/6/tasks/${props.id}` }}>View Details</StyledLink>
        </Box>
      </Flex>
    </Panel>
  )

};
