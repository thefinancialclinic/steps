import { getClients } from 'actions/clients';
import Modal from 'containers/Modal';
import { findById } from 'helpers';
import { composeUserLayout } from 'layouts';
import React from 'react';
import { connect } from 'react-redux';
import { Match, Redirect, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import EditProfile, { EDIT_PROFILE } from './EditProfile';
import FollowUp from './FollowUp';
import Goals from './Goals/Goals';
import Chat from './ProfileChat';
import TaskAdd from './ProfileTaskAdd';
import TaskAddEdit from './ProfileTaskAddEdit';
import TaskCreate from './ProfileTaskCreate';
import TaskEdit from './ProfileTaskEdit';
import TaskShow from './ProfileTaskShow';
import Tasks from './ProfileTasksList';
import { ModalSize } from 'components/Modal';

type Params = {
  id: number;
};

interface Props {
  actions: any;
  user: any;
  role: any;
  match: Match | { params: Params };
}

class Client extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getClients();
  }

  render() {
    const { user, match, role, actions } = this.props;
    if (!user) return null;

    const links = [
      { text: 'Tasks', to: `/clients/${user.id}/tasks` },
      { text: 'Goals', to: `/clients/${user.id}/goals` },
      { text: 'Chat', to: `/clients/${user.id}/chat` },
      { text: 'Follow Up', to: `/clients/${user.id}/follow-up` },
    ];

    const composeLayout = Component =>
      composeUserLayout(Component, { links, user, role });

    return (
      <div>
        <Switch>
          <Route path="/clients/:id/chat" render={composeLayout(Chat)} />
          <Route path="/clients/:id/goals" render={composeLayout(Goals)} />
          <Route
            path="/clients/:id/tasks/:taskId/edit"
            render={composeLayout(TaskEdit)}
          />
          <Route
            path="/clients/:id/tasks/create"
            render={composeLayout(TaskCreate)}
          />
          <Route
            path="/clients/:id/tasks/add"
            render={composeLayout(TaskAdd)}
          />
          <Route
            path="/clients/:id/tasks/:taskId/add"
            render={composeLayout(TaskAddEdit)}
          />
          <Route
            path="/clients/:id/tasks/:taskId"
            render={composeLayout(TaskShow)}
          />
          <Route path="/clients/:id/tasks" render={composeLayout(Tasks)} />
          <Route
            path="/clients/:id/follow-up"
            render={composeLayout(FollowUp)}
          />
          <Route render={() => <Redirect to={`/clients/${user.id}/tasks`} />} />
        </Switch>
        <Modal id={EDIT_PROFILE} size={ModalSize.Medium}>
          <EditProfile client={user} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, props: Props) => {
  return {
    user: findById(state.clients.clients, props.match.params.id),
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
