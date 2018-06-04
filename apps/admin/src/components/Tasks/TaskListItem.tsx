import React, { Component } from 'react';
import styled from 'styled-components';
import { SortableElement } from 'react-sortable-hoc';
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

export default SortableElement(task => {
  return (
    <Panel shadow>
      {task.value}
      <StyledLink to={`/clients/${task.userId}/tasks/${task.id}`}>View Details</StyledLink>
    </Panel>
  )
});
