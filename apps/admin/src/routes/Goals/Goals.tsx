import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NewGoal from './NewGoal';
import ViewGoalList from './ViewGoalList';

interface Props {
  className?: string;
}

class Goals extends React.Component<Props> {
  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <Switch>
          <Route path="/clients/:id/goals/new" component={NewGoal} />
          <Route path="/clients/:id/goals" component={ViewGoalList} />
        </Switch>
      </div>
    );
  }
}

export default Goals;
