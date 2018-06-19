import Badge from 'atoms/Badge';
import Panel from 'atoms/Panel';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { green, white } from 'styles/colors';
import { Task } from '../../reducers/tasks';

interface Props {
  className?: string;
  task: Task;
  addTask(task: Task): void;
  history: any;
  user?: any;
}

class TaskTemplate extends React.Component<Props, {}> {
  render() {
    const { className, task } = this.props;

    return (
      <div onClick={this.handleClick}>
        <Panel className={className}>
          <Box>
            <Badge text={task.category} />
          </Box>
          <Flex alignItems="center" className="task-row">
            <Box width={5 / 6}>
              <h3>{task.title}</h3>
            </Box>
            <Box className="edit-link" width={1 / 6}>
              <Link to={`/clients/6/tasks/${task.id}/edit`}>
                <div className="circle">Edit</div>
              </Link>
            </Box>
          </Flex>
        </Panel>
      </div>
    );
  }

  private handleClick = async event => {
    try {
      this.props.history.push(
        `/clients/${this.props.user.id}/tasks/${this.props.task.id}/add`,
      );
    } catch (error) {
      console.error(error);
    }
  };
}

const StyledTaskTemplate = styled(TaskTemplate)`
  .task-row {
    height: 100%;
  }
  .edit-link {
    a {
      color: ${white};
      text-decoration: none;
    }
  }
  .circle {
    background-color: ${green};
    border-radius: 50%;
    display: table-cell;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    width: 50px;
  }
`;

export default StyledTaskTemplate;
