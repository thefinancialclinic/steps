import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import AddTask from './AddTask';
// import EditTask from './EditTask';
// import NewTask from './NewTask';
import TaskList from 'components/Tasks/TaskList';
// import ViewTask from './ViewTask';
import { Client } from 'reducers/clients';

interface Props {
  client: Client;
}

class Tasks extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <Switch>
          {/* <Route path="add" component={AddTask} />
          <Route path="new" component={NewTask} />
          <Route path=":taskId/edit" component={EditTask} />
          <Route path=":taskId" component={ViewTask} /> */}
          <Route
            path=""
            render={props => <TaskList client={this.props.client} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Tasks;
