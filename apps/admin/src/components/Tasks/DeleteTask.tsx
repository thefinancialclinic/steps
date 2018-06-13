import React, { Component } from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { green, white, yellow } from 'styles/colors';
import Button from 'atoms/Buttons/Button';
import Modal from 'components/Modal';
import { Link } from 'react-router-dom';

interface Props {
  className?: string;
  client: any;
}

class DeleteTask extends React.Component<Props, {}> {
  render() {
    const { className, client } = this.props;

    return (
      <Modal className={className}>
        <h2>Task Deleted</h2>
        <Button white>UNDO</Button>
        <Flex className="actions" justifyContent="center">
          <Box>
            <Link to={`/clients/${client.id}/tasks/new`}>
              <Button>Add New Task</Button>
            </Link>
          </Box>
          <Box>
            <Link to={`/clients/${client.id}`}>
              <Button>Go To Workplan</Button>
            </Link>
          </Box>
        </Flex>
      </Modal>
    );
  }
}

const StyledDeleteTask = styled(DeleteTask)`
  text-align: center;
  font-size: 1.5em;
  line-height: 1.5;

  button {
    margin: 1em 0.5em;
  }
`;

export default StyledDeleteTask;
