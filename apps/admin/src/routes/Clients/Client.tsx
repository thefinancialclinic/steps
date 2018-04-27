import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from 'components/Clients/Sidebar';
import Tasks from 'components/Clients/Tasks';
import NewTask from 'routes/Tasks/NewTask';

interface Props {
  className?: string;
}

class Client extends React.Component<Props, {}> {
  render () {
    return (
      <div className={this.props.className}>
        <Sidebar />
        <Switch>
          <Route path="/clients/:id/tasks/new" component={NewTask} />

          <Route path="/clients/:id" component={Tasks} />
        </Switch>
      </div>
    );
  }
}
const StyledClient = styled(Client)`
display: flex;
`;

export default StyledClient;
