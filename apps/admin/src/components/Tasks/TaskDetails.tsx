import React from 'react';
import { Link, Location } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { grey } from 'styles/colors';
import Badge from 'atoms/Badge';
import Button from 'atoms/Buttons/Button';
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
            <Box>
              <Link className="action-link" to={`${location.pathname}/edit`}>
                Edit
              </Link>
              <span className="action-link" onClick={this.handleDelete}>
                Delete
              </span>
            </Box>
          </Flex>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="action-link">Steps</div>
          {task.steps &&
            task.steps.map((step, index) => (
              <p key={`step-${index}`}>{step.text}</p>
            ))}
        </Panel>
      </div>
    );
  }
}

const StyledViewTask = styled(TaskDetails)`
  .action-link {
    color: ${grey};
    font-size: 0.8em;
    margin-right: 1em;
    text-decoration: none;
    text-transform: uppercase;
  }
`;

export default StyledViewTask;
