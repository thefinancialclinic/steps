import React from 'react';
import { Route, Switch, Match } from 'react-router-dom';

// import AddTask from './AddTask';
// import EditTask from './EditTask';
// import NewTask from './NewTask';
import TaskList from 'components/Tasks/TaskList';
import TaskShow from './ProfileTaskShow';
import { Client } from 'reducers/clients';

interface Props {
  client: Client;
  match: Match;
}

class Tasks extends React.Component<Props, {}> {
  render() {
    const { url } = this.props.match;
    return (
      <div>
        <Switch>
          {/* <Route path="add" component={AddTask} />
          <Route path="new" component={NewTask} />
          <Route path=":taskId/edit" component={EditTask} /> */}
          <Route path={`${url}/:taskId`} component={TaskShow} />
          <Route
            path=""
            render={props => <TaskList {...props} client={this.props.client} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Tasks;
