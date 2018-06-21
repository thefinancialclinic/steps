import Button from 'atoms/Buttons/Button';
import { Box } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Match } from 'react-router-dom';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { grey, lightBlue, mediumBlue, white } from 'styles/colors';
import { remCalc } from 'styles/type';
import { svgBackgroundImageUrl } from 'styles';
import NoTasks from './NoTasks';
import TaskListItem from './TaskListItem';
import { getTasks, setTasks, setTaskStatus } from 'actions/tasks';
import { Flex } from 'grid-styled';
import { filterById, findById } from 'helpers';
const background = require('!svg-inline-loader!../../assets/hover-bg.svg');

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
  mix-blend-mode: lighten;
  position: absolute;
  overflow: hidden;
  border-radius: 5px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${svgBackgroundImageUrl('hover-bg.svg')};
  background-size: contain;
  background-position: ${props => props.i * 20}px top;
  background-repeat: repeat;
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
                <span>{index + 1}</span>
                <SVG i={index} />
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
    this.props.actions.setTasks(
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
    const { tasks, user, match } = this.props;

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
        <NoTasks user={user} />
      );

    return <div>{taskDisplay}</div>;
  }
}

export class ConnectedTaskList extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getTasks();
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
  actions: bindActionCreators({ getTasks, setTasks, setTaskStatus }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedTaskList);
