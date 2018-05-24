import React from 'react';
import { Flex, Box } from 'grid-styled';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import NoGoals from './NoGoals'

interface Props {
  className?: string;
}


class GoalList extends React.Component<Props, {}> {

  render () {
    const goals = [];
    const goalsDisplay = goals.length > 0 ? (
        <Box width={1} p={4}>
          <h2>Tasks</h2>
          <Link to="/clients/1/goals/new">New Goal</Link>
          A list of goals goes here
        </Box>
    ) : (
        <Box width={1} p={4}>
          <NoGoals></NoGoals>
        </Box>
      );

    return (
      <div>
        {goalsDisplay}
      </div>
    );
  }
}

const StyledGoalList = styled(GoalList)`
  display: flex;
`;

export default StyledGoalList;
