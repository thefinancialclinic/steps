import { Box, Flex } from 'grid-styled';
import React from 'react';
import { History, Link, Location } from 'react-router-dom';
import styled from 'styled-components';

import Badge from 'atoms/Badge';
import DeleteButton from 'atoms/Buttons/DeleteButton';
import EditButton from 'atoms/Buttons/EditButton';
import Label from 'atoms/Label';
import Panel from 'atoms/Panel';
import DeleteTask, { DELETE_TASK_MODAL } from 'components/Tasks/DeleteTask';
import Modal from 'containers/Modal';
import { green, lightGrey, white } from 'styles/colors';
import { remCalc, sansSerif, serif } from 'styles/type';
import { AlertLevel } from '../Alert/types';
import { ModalSize } from '../Modal';
import { USER_TYPE, User } from 'reducers/auth';
import { Task } from 'reducers/tasks';

interface Props {
  className?: string;
  client: User;
  user: User;
  history: History;
  location: Location;
  task: Task;
  actions: { addTask; deleteTask; hideModal; showModal; addAlert };
}

class TaskDetails extends React.Component<Props> {
  handleDelete = () => {
    const { actions, task } = this.props;

    actions
      .deleteTask(task.id)
      .then(() => {
        actions.showModal(DELETE_TASK_MODAL);
      })
      .catch(err => {
        actions.addAlert({
          level: AlertLevel.Error,
          id: 'delete-task-error',
          message: err.message,
        });
      });
  };

  undoDelete = () => {
    const { actions, history, task } = this.props;

    actions.addTask(task).then(() => {
      actions.hideModal(DELETE_TASK_MODAL);
      history.goBack();
    });
  };

  render() {
    const { className, client, location, task, actions, user } = this.props;
    if (!task) return null;

    return (
      <div>
        <Modal
          id={DELETE_TASK_MODAL}
          size={ModalSize.Medium}
          onClose={() => actions.hideModal(DELETE_TASK_MODAL)}
          noPadding
        >
          <DeleteTask user={client} task={task} undoDelete={this.undoDelete} />
        </Modal>
        <Panel className={className}>
          {user.type === USER_TYPE.CLIENT ? (
            <Box>
              <Badge text={task.category} />
            </Box>
          ) : (
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
          )}
          <H3>{task.title}</H3>
          <Description>{task.description}</Description>
          <Label grey>Steps</Label>
          {task.steps &&
            task.steps.map((step, index) => (
              <Flex className={className} mb={30} key={index}>
                <Box mr={20}>
                  <div className="circle">{index + 1}</div>
                </Box>
                <Box width={1}>
                  <p key={`step-${index}`} className="step-text">
                    {step.text}
                  </p>
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

  .step-text {
    font-family: ${serif};
    font-size: ${remCalc(21)};
    margin-top: 0;
  }
`;

const Description = styled.p`
  background-color: rgba(244, 244, 244, 0.5);
  margin-bottom: 30px;
  margin-left: -24px;
  margin-right: -24px;
  margin-top: 0;
  padding-bottom: 20px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 20px;
`;

const H3 = styled.h3`
  font-size: ${remCalc(30)};
  font-family: ${sansSerif};
  margin-top: ${remCalc(10)};
`;

export default StyledViewTask;
