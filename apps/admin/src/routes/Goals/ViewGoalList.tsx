import { addAlert } from 'actions/alerts';
import { getClients } from 'actions/clients';
import Button from 'atoms/Buttons/Button';
import { Alert, AlertLevel } from 'components/Alert/types';
import GoalList from 'components/Goals/GoalList';
import NoGoals from 'components/Goals/NoGoals';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Client } from 'reducers/clients';
import { bindActionCreators } from 'redux';

interface Props {
  actions: {
    addAlert(alert: Alert): void;
    getClients(): Promise<void>;
  };
  client?: Client;
}

export const GoalListLayout: React.SFC<{ goals: string[]; client: Client }> = ({
  goals,
  client,
}) => (
  <div>
    <GoalList goals={goals} />
    <Flex justifyContent="center">
      <Link to={`/clients/${client.id}/goals/new`}>
        <Button>New Goal</Button>
      </Link>
    </Flex>
  </div>
);

export class ViewGoalList extends React.Component<Props> {
  componentWillMount() {
    this.props.actions.getClients().catch(err => {
      this.props.actions.addAlert({
        level: AlertLevel.Error,
        message: err.message,
        id: 'view-goal-get-clients-error',
      });
    });
  }

  render() {
    return (
      <Box width={1} p={4}>
        {this.hasGoals() ? (
          <GoalListLayout
            goals={this.props.client ? this.props.client.goals : []}
            client={this.props.client}
          />
        ) : (
          <NoGoals client={this.props.client} />
        )}
      </Box>
    );
  }

  private hasGoals(): boolean {
    return (
      this.props.client &&
      this.props.client.goals &&
      this.props.client.goals.length > 0
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    client: state.clients.clients.find(c => c.id == props.match.params.id),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addAlert, getClients }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewGoalList);
