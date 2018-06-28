import React from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';
import { bindActionCreators } from 'redux';

import { addAlert } from 'actions/alerts';
import { setClientGoals } from 'actions/clients';
import BackButton from 'atoms/Buttons/BackButton';
import Main from 'atoms/Main';
import { Alert, AlertLevel } from 'components/Alert/types';
import { Goal } from 'components/Goals/types';
import GoalForm from 'forms/GoalForm';
import { Client } from 'reducers/clients';

interface Props {
  actions: {
    addAlert(alert: Alert): void;
    setClientGoals(client: Client, goals: string[]): Promise<void>;
  };
  client: Client;
  history: History;
  goal: Goal;
}

export class EditGoal extends React.Component<Props> {
  updateGoal = goalData => {
    const updatedGoals = this.props.client.goals.map((goal, i) => {
      if (i == this.props.goal.id) {
        return goalData.goal;
      }
      return goal;
    });
    this.props.actions
      .setClientGoals(this.props.client, updatedGoals)
      .then(() => {
        this.props.history.push(`/clients/${this.props.client.id}/goals`);
        this.props.actions.addAlert({
          level: AlertLevel.Success,
          message: 'Success!',
          id: 'edit-goal-success',
        });
      })
      .catch(err => {
        this.props.actions.addAlert({
          level: AlertLevel.Error,
          message: err.message,
          id: 'new-goal-error',
        });
      });
  };

  render() {
    return (
      <Main>
        <BackButton to={`/goals`} />
        <GoalForm onSubmit={this.updateGoal} goal={this.props.goal} />
      </Main>
    );
  }
}

const mapStateToProps = ({ auth }, { match }) => ({
  client: auth.user,
  goal: {
    text: auth.user.goals[match.params.id],
    id: match.params.id,
  },
  // TODO: Use real goal ID instead of index
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addAlert, setClientGoals }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditGoal);
