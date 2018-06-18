import React from 'react';
import { getClients } from 'actions/clients';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Match, Redirect, Route, Switch } from 'react-router-dom';
import Profile from 'components/Clients/Profile';
import Tasks from './ProfileTasksList';
import TaskAdd from './ProfileTaskAdd';
import TaskCreate from './ProfileTaskCreate';
import TaskShow from './ProfileTaskShow';
import TaskAddEdit from './ProfileTaskAddEdit';
import TaskEdit from './ProfileTaskEdit';
import Chat from './ProfileChat';
import Goals from './Goals/Goals';
import { findById } from 'helpers';
import FollowUp from './FollowUp';

type Params = {
  id: number;
};

interface Props {
  actions: any;
  client: any;
  user: any;
  role: any;
  match: Match | { params: Params };
}

class Client extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getClients();
  }

  render() {
    const { client, match, role } = this.props;
    if (!client) return null;

    const links = [
      { text: 'Tasks', to: `/clients/${client.id}/tasks` },
      { text: 'Goals', to: `/clients/${client.id}/goals` },
      { text: 'Chat', to: `/clients/${client.id}/chat` },
      { text: 'Follow Up', to: `/clients/${client.id}/follow-up` },
    ];

    const composeProfile = Component => matchProps => (
      <Profile
        {...matchProps}
        component={Component}
        links={links}
        client={client}
        role={role}
      />
    );

    return (
      <Switch>
        <Route path="/clients/:id/chat" render={composeProfile(Chat)} />
        <Route path="/clients/:id/goals" render={composeProfile(Goals)} />
        <Route
          path="/clients/:id/tasks/:taskId/edit"
          render={composeProfile(TaskEdit)}
        />
        <Route
          path="/clients/:id/tasks/create"
          render={composeProfile(TaskCreate)}
        />
        <Route path="/clients/:id/tasks/add" render={composeProfile(TaskAdd)} />
        <Route
          path="/clients/:id/tasks/:taskId/add"
          render={composeProfile(TaskAddEdit)}
        />
        <Route
          path="/clients/:id/tasks/:taskId"
          render={composeProfile(TaskShow)}
        />
        <Route path="/clients/:id/tasks" render={composeProfile(Tasks)} />
        <Route
          path="/clients/:id/follow-up"
          render={composeProfile(FollowUp)}
        />
        <Route render={() => <Redirect to={`/clients/${client.id}/tasks`} />} />
      </Switch>
    );
  }
}

const mapStateToProps = (state, props: Props) => {
  return {
    client: findById(state.clients.clients, props.match.params.id),
    role: state.auth.user.role,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClients }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Client);
