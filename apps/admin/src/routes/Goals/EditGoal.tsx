import React from 'react';
import GoalForm from 'forms/GoalForm';
import { Alert, AlertLevel } from 'components/Alert/types';
import BackButton from 'atoms/Buttons/BackButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAlert } from 'actions/alerts';
import { getClients, setClientGoals } from 'actions/clients';
import { Client } from 'reducers/clients';
import { History } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Goal } from 'components/Goals/types';
import { findById } from 'helpers';
import Main from 'atoms/Main';

interface Props {
  actions: {
    addAlert(alert: Alert): void;
    getClients(): Promise<void>;
    setClientGoals(clientId: number, goals: string[]): Promise<void>;
  };
  client?: Client;
  history: History;
  goal: Goal;
}

export class EditGoal extends React.Component<Props> {
  componentWillMount() {
    this.props.actions.getClients().catch(err => {
      this.props.actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'edit-goal-get-client-error',
      });
    });
  }

  updateGoal = goalData => {
    const updatedGoals = this.props.client.goals.map((goal, i) => {
      if (i == this.props.goal.id) {
        return goalData.goal;
      }
      return goal;
    });
    this.props.actions
      .setClientGoals(this.props.client.id, updatedGoals)
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
        <BackButton to={`/clients/${this.props.client.id}/goals`} />
        <GoalForm onSubmit={this.updateGoal} goal={this.props.goal} />
      </Main>
    );
  }
}

const mapStateToProps = ({ clients }, { match }) => ({
  client: findById(clients.clients, match.params.id),
  goal: {
    text: findById(clients.clients, match.params.id).goals[match.params.goalId],
    id: match.params.goalId,
  },
  // TODO: Use real goal ID instead of index
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { addAlert, getClients, setClientGoals },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EditGoal));
