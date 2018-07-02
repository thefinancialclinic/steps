import Goal from 'components/Goals/Goal';
import { GoalList } from 'components/Goals/GoalList';
import React from 'react';
import { connect } from 'react-redux';
import Panel from 'atoms/Panel';
import { Box } from 'grid-styled';
import styled from 'styled-components';
import { yellow } from 'styles/colors';

interface Props {
  goals: string[];
}

export class Goals extends React.Component<Props> {
  render() {
    const { goals } = this.props;
    if (goals.length > 0) {
      return (
        <GoalList goals={goals}>
          {childProps => <Goal {...childProps} />}
        </GoalList>
      );
    } else {
      return (
        <NoGoals width={1} p={4}>
          <Panel>
            <div>
              <i className="material-icons">star</i>
            </div>
            <div>No goals yet. Create your first goal with your coach.</div>
          </Panel>
        </NoGoals>
      );
    }
  }
}

const NoGoals = styled(Box)`
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

const mapStateToProps = state => ({
  goals: state.auth.user.goals,
});

export default connect(mapStateToProps)(Goals);
