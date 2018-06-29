import { addAlert } from 'actions/alerts';
import { getClients } from 'actions/clients';
import Button from 'atoms/Buttons/Button';
import { Alert, AlertLevel } from 'components/Alert/types';
import GoalList from 'components/Goals/GoalList';
import NoGoals from 'components/Goals/NoGoals';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link, History } from 'react-router-dom';
import { Client } from 'reducers/clients';
import { bindActionCreators } from 'redux';
import Goal from 'components/Goals/Goal';
import styled from 'styled-components';

interface Props {
  actions: {
    addAlert(alert: Alert): void;
    getClients(): Promise<void>;
  };
  client?: Client;
  history: History;
}

interface GoalListLayoutProps {
  goals: string[];
  client: Client;
  history: History;
}

export const GoalListLayout: React.SFC<GoalListLayoutProps> = ({
  goals,
  client,
  history,
}) => (
  <div>
    <GoalList goals={goals}>
      {childProps => (
        <Goal
          {...childProps}
          onEdit={() =>
            history.push(`/clients/${client.id}/goals/${childProps.index}/edit`)
          }
        />
      )}
    </GoalList>
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
    const { client, history } = this.props;
    return (
      <Box width={1} p={4}>
        {this.hasGoals() ? (
          <GoalListLayout
            goals={client ? client.goals : []}
            client={client}
            history={history}
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
