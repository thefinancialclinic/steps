import React from 'react';
import { Link, Location } from 'react-router-dom';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { green, grey, white } from 'styles/colors';
import { remCalc, sansSerif } from 'styles/type';
import Badge from 'atoms/Badge';
import Panel from 'atoms/Panel';
import DeleteTask from 'components/Tasks/DeleteTask';
import { deleteTask } from 'actions/tasks';

interface Props {
  className?: string;
  user: any;
  location: Location;
  task: any;
  actions: { deleteTask };
}

const steps = task => {
  return task.steps.map((step, index) => (
    <p key={`step-${index}`}>{step.text}</p>
  ));
};

class TaskDetails extends React.Component<Props, {}> {
  state = {
    showModal: false,
  };

  setModal = showModal => {
    this.setState({ showModal });
  };

  renderModal = user => {
    if (this.state.showModal) {
      return <DeleteTask user={user} />;
    }
  };

  handleDelete = async () => {
    try {
      await this.props.actions.deleteTask(this.props.task.id);
      this.setModal(!this.state.showModal);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { className, user, location, task } = this.props;
    if (!task) return null;

    return (
      <div>
        {this.renderModal(user)}
        <Panel className={className}>
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Badge text={task.category} />
            </Box>
            <Box className="action-links">
              <Link className="action-link" to={`${location.pathname}/edit`}>
                <i className="material-icons">edit</i>
                <span>Edit</span>
              </Link>
              <span className="action-link" onClick={this.handleDelete}>
                <i className="material-icons">delete</i>
                <span>Delete</span>
              </span>
            </Box>
          </Flex>
          <H3>{task.title}</H3>
          <p>{task.description}</p>
          <div className="action-link">Steps</div>
          {task.steps &&
            task.steps.map((step, index) => (
              <Flex className={className} mb={30} key={index}>
                <Box mr={20}>
                  <div className="circle">{index + 1}</div>
                </Box>
                <Box width={1}>
                  <p key={`step-${index}`}>{step.text}</p>
                </Box>
              </Flex>
            ))}
        </Panel>
      </div>
    );
  }
}

const StyledViewTask = styled(TaskDetails)`
  .action-links {
    align-items: center;
    display: flex;
    flex-direction: row;
  }

  .action-link {
    color: ${grey};
    display: flex;
    align-items: center;
    font-size: ${remCalc(14)};
    margin-bottom: 1em;
    margin-right: 1em;
    text-decoration: none;
    text-transform: uppercase;
    i {
      font-size: ${remCalc(14)};
      margin-right: 5px;
    }
  }

  .circle {
    align-items: center;
    background-color: ${green};
    border-radius: 50%;
    color: ${white};
    display: flex;
    font-family: ${sansSerif};
    height: ${remCalc(50)};
    justify-content: center;
    margin-bottom: ${remCalc(20)};
    text-align: center;
    width: ${remCalc(50)};
  }
`;

const H3 = styled.h3`
  font-family: ${sansSerif};
  margin-top: ${remCalc(10)};
`;

export default StyledViewTask;
