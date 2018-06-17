import React from 'react';
import { getClients } from 'actions/clients';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Match, Route, Switch } from 'react-router-dom';
import Profile from 'components/Clients/Profile';
import Tasks from './ProfileTasksList';
import TaskAdd from './ProfileTaskAdd';
import TaskShow from './ProfileTaskShow';
import TaskEdit from './ProfileTaskEdit';
import Chat from './ProfileChat';

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
    const { url } = match;

    const links = [
      { text: 'Tasks', to: `${url}/tasks` },
      { text: 'Goals', to: `${url}/goals` },
      { text: 'Chat', to: `${url}/chat` },
    ];

    const composeProfile = Component => matchProps => (
      <Profile
        component={Component}
        links={links}
        client={client}
        role={role}
        {...matchProps}
      />
    );

    return (
      <Switch>
        <Route
          path={`/clients/:id/tasks/:taskId/edit`}
          render={composeProfile(TaskEdit)}
        />
        <Route
          path={`/clients/:id/tasks/:taskId`}
          render={composeProfile(TaskShow)}
        />
        <Route
          path={`/clients/:id/tasks/add`}
          render={composeProfile(TaskAdd)}
        />
        <Route path={`/clients/:id`} render={composeProfile(Tasks)} />
        {/* <Route path={`${url}/chat`} render={composeProfile(Chat)} /> */}
      </Switch>
    );
  }
}
const mapStateToProps = (state, props: Props) => {
  return {
    client: state.clients.clients.find(
      c => c.id === parseInt(props.match.params.id),
    ),
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
