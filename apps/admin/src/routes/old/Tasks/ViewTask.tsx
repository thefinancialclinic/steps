import React from 'react';
import { Link } from 'react-router-dom';
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
  client: any;
  task: any;
  actions: { deleteTask };
}

const steps = task => {
  return task.steps.map((step, index) => (
    <p key={`step-${index}`}>{step.text}</p>
  ));
};

class ViewTask extends React.Component<Props, {}> {
  state = {
    showModal: false,
  };

  setModal = showModal => {
    this.setState({ showModal });
  };

  renderModal = client => {
    if (this.state.showModal) {
      return <DeleteTask client={client} />;
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
    const { className, client, task } = this.props;

    return (
      <div>
        {this.renderModal(client)}
        <Panel className={className}>
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Badge text={'income'} />
            </Box>
            <Box>
              <Link
                className="action-link"
                to={`/clients/${client.id}/tasks/${task.id}/edit`}
              >
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

const StyledViewTask = styled(ViewTask)`
  .action-link {
    color: ${grey};
    font-size: 0.8em;
    margin-right: 1em;
    text-decoration: none;
    text-transform: uppercase;
  }
`;

const mapStateToProps = (state, props) => ({
  task: state.tasks.tasks.find(t => (t.id = props.match.params.taskId)),
  client: state.clients.clients.find(c => (c.id = props.match.params.id)),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ deleteTask }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledViewTask);
