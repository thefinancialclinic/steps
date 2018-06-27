import Button from 'atoms/Buttons/Button';
import { Box } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Match } from 'react-router-dom';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { mediumBlue, white } from 'styles/colors';
import { remCalc } from 'styles/type';
import { svgBackgroundImageUrl } from 'styles';
import NoTasks from './NoTasks';
import TaskListItem from './TaskListItem';
import { getTasks, orderTasks, setTaskStatus } from 'actions/tasks';
import { Flex } from 'grid-styled';
import { filterById, findById } from 'helpers';
import { showModal, hideModal } from 'actions/modals';
import Modal from 'containers/Modal';
import TermsModal, { TERMS } from 'components/Clients/TermsModal';
import TaskStepNote from './TaskStepNote';
import { ModalSize } from '../Modal';

const TaskContainer = styled.div`
  box-shadow: 0 0 4px 0 rgba(30 65 165, 0.2);
  display: flex;
  flex-direction: row;
  margin-bottom: ${remCalc(20)};
  position: relative;

  &.completed {
    div {
      background-color: ${mediumBlue};
    }
  }
`;

const TaskNumber = styled.div`
  align-items: center;
  background-color: ${white};
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  bottom: 0;
  display: flex;
  font-size: ${remCalc(90)};
  font-weight: 700;
  justify-content: center;
  margin-right: 2px;
  position: relative;
  text-align: center;
  width: 130px;
`;

type SVGProps = {
  i: number;
};

const SVG = styled<SVGProps, 'div'>('div')`
  background-image: ${svgBackgroundImageUrl('hover-bg.svg')};
  background-position: ${props => `${Math.sin(props.i) * 100}% top`};
  background-repeat: repeat;
  background-size: 200%;
  border-radius: 5px;
  bottom: 0;
  left: 0;
  mix-blend-mode: lighten;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
`;

interface ListProps {
  setTaskStatus;
  items: any;
  url: string;
}

const SortableList = SortableContainer(
  ({ items, setTaskStatus, url }: ListProps) => {
    let taskClass = status => {
      return status === 'COMPLETED' ? 'compelted' : 'active';
    };
    return (
      <Box>
        {items.map((task, index) => {
          return (
            <TaskContainer key={index} className={taskClass(task.status)}>
              <TaskNumber>
                <div>{index + 1}</div>
                <SVG i={index + 1} />
              </TaskNumber>
              <TaskListItem
                key={`item-${index}`}
                setTaskStatus={setTaskStatus}
                index={index}
                task={task}
                url={url}
              />
            </TaskContainer>
          );
        })}
      </Box>
    );
  },
);

interface Props {
  actions?: any;
  tasks?: any;
  user: any;
  match: Match;
}

export class TaskList extends React.Component<Props, {}> {
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

  render() {
    const { tasks, user, match, actions } = this.props;

    const taskDisplay =
      tasks.length > 0 ? (
        <Box>
          <h2>Tasks</h2>
          <SortableList
            items={tasks}
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
    return <TaskList {...this.props} />;
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
