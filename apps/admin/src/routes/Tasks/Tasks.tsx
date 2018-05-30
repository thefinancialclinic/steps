import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AddTask from './AddTask';
import EditTask from './EditTask';
import NewTask from './NewTask';
import TaskList from 'components/Tasks/TaskList';
import ViewTask from './ViewTask';

interface Props {
  className?: string;
}

class Tasks extends React.Component<Props, {}> {

  render () {
    const { className } = this.props;
    return (
      <div className={className}>
        <Switch>
          <Route path="/clients/:id/tasks/add" component={AddTask} />
          <Route path="/clients/:id/tasks/new" component={NewTask} />
          <Route path="/clients/:id/tasks/:taskId/edit" component={EditTask} />
          <Route path="/clients/:id/tasks/:taskId" component={ViewTask} />
          <Route path="/clients/:id/tasks" component={TaskList} />
        </Switch>
      </div>
    );
  }
}

export default Tasks;
