import React from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router-dom';

import TaskList from 'components/Tasks/TaskList';
import { Client } from 'reducers/clients';
import { filterById, findById } from 'helpers';

interface Props {
  client: Client;
  location: Location;
  match: Match;
}

class Tasks extends React.Component<Props, {}> {
  render() {
    const { location, match } = this.props;
    return (
      <TaskList client={this.props.client} location={location} match={match} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  tasks: filterById(state.tasks.tasks, props.match.params.id, 'user_id'),
  client: findById(state.clients.clients, props.match.params.id),
});

export default connect(mapStateToProps)(Tasks);
