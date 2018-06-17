import React from 'react';
import { connect } from 'react-redux';
import { Match } from 'react-router-dom';

import TaskList from 'components/Tasks/TaskList';
import { Client } from 'reducers/clients';

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
  tasks: state.tasks.tasks.find(t => (t.user_id = props.match.params.id)),
  client: state.clients.clients.find(c => (c.id = props.match.params.id)),
});

export default connect(mapStateToProps)(Tasks);
