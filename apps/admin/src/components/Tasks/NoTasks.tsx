import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import { Box } from 'grid-styled';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { yellow } from 'styles/colors';

interface Props {
  className?: string;
  user: any;
}

class NoTasks extends React.Component<Props, {}> {
  render() {
    const { className, user } = this.props;

    return (
      <Box width={1} p={4} className={className}>
        <Panel>
          <div>
            <StyledIcon className="material-icons">mood</StyledIcon>
          </div>
          <div>Profile created!</div>
          <div>Now let's add some tasks.</div>
          <Box m={2}>
            <Link to={{ pathname: `/clients/${user.id}/tasks/add` }}>
              <Button>Add New Task</Button>
            </Link>
          </Box>
        </Panel>
      </Box>
    );
  }
}

const StyledIcon = styled.i`
  color: ${yellow};
  font-size: 6em;
`;

const StyledNoTasks = styled(NoTasks)`
  text-align: center;
  font-size: 1.5em;
  line-height: 1.5;

  button {
    margin-top: 1em;
  }
`;

export default StyledNoTasks;
