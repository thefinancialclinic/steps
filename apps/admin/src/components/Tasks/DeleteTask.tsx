import Button from 'atoms/Buttons/Button';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { red } from 'styles/colors';

export const DELETE_TASK_MODAL = 'DELETE_TASK_MODAL';

interface Props {
  className?: string;
  user: any;
}

class DeleteTask extends React.Component<Props, {}> {
  render() {
    const { className, user } = this.props;

    return (
      <Box className={className} pb={4}>
        <Background>
          <NoMargin>Task Deleted</NoMargin>
          <Button white>UNDO</Button>
        </Background>
        <Flex className="actions" justifyContent="center">
          <Box>
            <Link to={`/clients/${user.id}/tasks/new`}>
              <Button>Add New Task</Button>
            </Link>
          </Box>
          <Box>
            <Link to={`/clients/${user.id}`}>
              <Button>Go To Workplan</Button>
            </Link>
          </Box>
        </Flex>
      </Box>
    );
  }
}

const NoMargin = styled.h2`
  margin: 0;
  padding: 0.83;
`;

const Background = styled.div`
  padding-top: 2em;
  background-color: ${red}20;
  width: 100%;
`;

const StyledDeleteTask = styled(DeleteTask)`
  text-align: center;
  font-size: 1.5em;
  line-height: 1.5;

  button {
    margin: 1em 0.5em;
  }
`;

export default StyledDeleteTask;
