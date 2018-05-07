import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getClients } from 'actions/clients';
import styled from 'styled-components';

import Sidebar from 'components/Clients/Sidebar';
import TaskList from 'components/Tasks/TaskList';
import NewTask from 'routes/Tasks/NewTask';


interface Props {
  className?: string;
  actions: any;
  client: any;
}

class Client extends React.Component<Props, {}> {
  componentWillMount () {
    this.props.actions.getClients();
  }

  render () {
    if (!this.props.client) return null;

    return (
      <div className={this.props.className}>
        <Sidebar client={this.props.client} />
        <div>
          <Switch>
            <Route path="/clients/:id/tasks/new" component={NewTask} />
            <Route path="/clients/:id" component={TaskList} />
          </Switch>
        </div>
      </div>
    );
  }
}
const StyledClient = styled(Client)`
display: flex;
`;

const mapStateToProps = (state, props) => ({
  client: state.clients.clients.find(c => c.id == props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClients }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledClient);
