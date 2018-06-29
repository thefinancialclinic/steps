import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Match } from 'react-router-dom';

import { filterById, findById } from 'helpers';

import SortableTaskList from 'components/Tasks/SortableTaskList';
import TermsModal, { TERMS } from 'components/Clients/TermsModal';
import Modal from 'containers/Modal';
import { ModalSize } from 'components/Modal';

import { Client } from 'reducers/clients';
import { Task } from 'reducers/tasks';
import { getTasks, orderTasks, setTaskStatus } from 'actions/tasks';
import { hideModal, showModal } from 'actions/modals';

interface Props {
  user: Client;
  location: Location;
  match: Match;
  tasks: Task[];
  actions: { getTasks; orderTasks; setTaskStatus; showModal; hideModal };
}

class Tasks extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getTasks().then(() => {
      if (this.props.tasks.length === 0) {
        this.props.actions.showModal(TERMS);
      }
    });
  }

  render() {
    const { actions, location, match, user, tasks } = this.props;

    return tasks.length > 0 ? (
      <SortableTaskList
        actions={actions}
        tasks={tasks}
        user={user}
        location={location}
        match={match}
      />
    ) : (
      <Modal size={ModalSize.Large} id={TERMS}>
        <TermsModal
          onClose={() => actions.hideModal(TERMS)}
          phoneNumber="+16467988004"
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state, props) => ({
  tasks: filterById(state.tasks, props.match.params.id, 'user_id').sort(
    (a, b) => a.order - b.order,
  ),
  user: findById(state.clients.clients, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { getTasks, orderTasks, setTaskStatus, showModal, hideModal },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
