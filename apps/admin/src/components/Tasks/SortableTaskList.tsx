import React from 'react';
import { connect } from 'react-redux';
import { Link, Match } from 'react-router-dom';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import { Box, Flex } from 'grid-styled';
import map from 'lodash/map';
import uniq from 'lodash/uniq';

import { filterById, findById } from 'helpers';
import Button from 'atoms/Buttons/Button';
import Modal from 'containers/Modal';
import TermsModal, { TERMS } from 'components/Clients/TermsModal';
import { ModalSize } from '../Modal';
import Filter, { FilterCategory } from 'components/Filter';
import NoTasks from './NoTasks';

import { getTasks, orderTasks, setTaskStatus } from 'actions/tasks';
import { hideModal, showModal } from 'actions/modals';
import TaskList from './TaskList';

interface ListProps {
  setTaskStatus;
  items: any;
  url: string;
}

const SortableList = SortableContainer((props: ListProps) => {
  return <TaskList {...props} sortable={true} />;
});

interface Props {
  actions?: any;
  tasks?: any;
  user: any;
  match: Match;
}

interface State {
  categories: FilterCategory[];
}

export class SortableTaskList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.tasks === prevProps.tasks) return;
    const categories = uniq(map(this.props.tasks, 'category')).map(
      (name: string) => ({
        name,
        active: true,
      }),
    );
    this.setState({ categories });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.actions.orderTasks(
      arrayMove(this.props.tasks, oldIndex, newIndex),
    );
  };

  shouldCancelStart = e => {
    if (
      e.target.tagName.toLowerCase() === 'a' ||
      e.target.tagName.toLowerCase() === 'i'
    ) {
      return true;
    }
  };

  updateCategories = category => {
    const categories = this.state.categories.map(c => {
      if (c.name !== category.name) return c;
      return { ...c, active: !c.active };
    });
    this.setState({ categories });
  };

  render() {
    const { tasks, user, match, actions } = this.props;
    const { categories } = this.state;
    const filteredTasks = tasks.filter(t =>
      categories.map(c => !!c.active && c.name).includes(t.category),
    );
    const taskDisplay =
      tasks.length > 0 ? (
        <Box>
          <h2>Tasks</h2>
          <Filter categories={categories} update={this.updateCategories} />
          <SortableList
            items={filteredTasks}
            onSortEnd={this.onSortEnd}
            shouldCancelStart={this.shouldCancelStart}
            setTaskStatus={this.props.actions.setTaskStatus}
            url={match.url}
          />
          <Flex justifyContent="center">
            <Link to={`/clients/${user.id}/tasks/add`}>
              <Button>Add New Task</Button>
            </Link>
          </Flex>
        </Box>
      ) : (
        <div>
          <NoTasks user={user} />
          <Modal size={ModalSize.Large} id={TERMS}>
            <TermsModal
              onClose={() => this.props.actions.hideModal(TERMS)}
              phoneNumber="+16467988004"
            />
          </Modal>
        </div>
      );
    return <div>{taskDisplay}</div>;
  }
}

export class ConnectedTaskList extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getTasks().then(() => {
      if (this.props.tasks.length === 0) {
        this.props.actions.showModal(TERMS);
      }
    });
  }
  render() {
    return <SortableTaskList {...this.props} />;
  }
}

const mapStateToProps = (state, props) => {
  return {
    tasks: filterById(
      state.tasks.tasks,
      props.user.id || props.match.params.id,
      'user_id',
    ),
    user: findById(
      state.clients.clients,
      props.user.id || props.match.params.id,
    ),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { getTasks, orderTasks, setTaskStatus, showModal, hideModal },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedTaskList);
