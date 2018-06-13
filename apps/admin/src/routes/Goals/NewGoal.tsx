import React from 'react';
import GoalForm from 'forms/GoalForm';
import { Alert, AlertLevel } from 'components/Alert/types';
import BackButton from 'atoms/Buttons/BackButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAlert } from 'actions/alerts';
import { getClients } from 'actions/clients';
import { Client } from 'reducers/clients';

interface Props {
  actions: {
    addAlert(alert: Alert): void;
    getClients(): Promise<void>;
  };
  client?: Client;
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
    // create goal
  };

  render() {
    return (
      <div>
        <BackButton to={`/clients/${this.props.client.id}/goals`} />
        <GoalForm onSubmit={this.createGoal} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  client: state.clients.clients.find(c => c.id == props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addAlert, getClients }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewGoal);
