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
}

export class NewGoal extends React.Component<Props> {
  componentWillMount() {
    this.props.actions.getClients().catch(err => {
      this.props.actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'new-goal-get-client-error',
      });
    });
  }

  createGoal = goalData => {
    const updatedGoals = [...this.props.client.goals, goalData.goal];
    this.props.actions
      .setClientGoals(this.props.client.id, updatedGoals)
      .then(() => {
        this.props.history.push(`/clients/${this.props.client.id}/goals`);
        this.props.actions.addAlert({
          level: AlertLevel.Success,
          message: 'Success!',
          id: 'new-goal-success',
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
        <GoalForm onSubmit={this.createGoal} />
      </Main>
    );
  }
}

const mapStateToProps = (state, props) => ({
  client: findById(state.clients.clients, props.match.params.id),
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
)(withRouter(NewGoal));
