import Badge from 'atoms/Badge';
import Panel from 'atoms/Panel';
import DeleteTask, { DELETE_TASK_MODAL } from 'components/Tasks/DeleteTask';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { Link, Location } from 'react-router-dom';
import styled from 'styled-components';
import { green, grey, white } from 'styles/colors';
import { remCalc, sansSerif } from 'styles/type';
import { ModalSize } from '../Modal';
import Modal from 'containers/Modal';
import { DELETE_TASK } from 'actions/tasks';
import EditButton from 'atoms/Buttons/EditButton';
import DeleteButton from 'atoms/Buttons/DeleteButton';
import { AlertLevel } from '../Alert/types';

interface Props {
  className?: string;
  user: any;
  location: Location;
  task: any;
  actions: { deleteTask; hideModal; showModal; addAlert };
}

class TaskDetails extends React.Component<Props> {
  handleDelete = async () => {
    console.log('handle delete');
    const { actions } = this.props;
    try {
      await actions.deleteTask(this.props.task.id);
      actions.showModal(DELETE_TASK_MODAL);
    } catch (error) {
      actions.addAlert({
        level: AlertLevel.Error,
        id: 'delete-task-error',
        message: error.message,
      });
    }
  };

  render() {
    const { className, user, location, task, actions } = this.props;
    if (!task) return null;

    return (
      <div>
        <Modal
          id={DELETE_TASK}
          size={ModalSize.Medium}
          onClose={() => actions.hideModal(DELETE_TASK_MODAL)}
        >
          <DeleteTask user={user} />
        </Modal>
        <Panel className={className}>
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Badge text={task.category} />
            </Box>
            <Box className="action-links">
              <Link className="action-link" to={`${location.pathname}/edit`}>
                <EditButton />
              </Link>
              <span className="action-link" onClick={this.handleDelete}>
                <DeleteButton />
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
    margin-right: 1em;
    text-decoration: none;
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
