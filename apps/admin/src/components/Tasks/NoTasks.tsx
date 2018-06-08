import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import { Box } from 'grid-styled';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { yellow } from 'styles/colors';

interface Props {
  className?: string;
  client: any;
}

class NoTasks extends React.Component<Props, {}> {
  render() {
    const { className, client } = this.props;

    return (
      <Box width={1} p={4} className={className}>
        <Panel>
          <div>
            <i className="material-icons">mood</i>
          </div>
          <div>Profile created!</div>
          <div>Now let's add some tasks.</div>
          <Box m={2}>
            <Link to={{ pathname: `/clients/${client.id}/tasks/add` }}>
              <Button>Add New Task</Button>
            </Link>
          </Box>
        </Panel>
      </Box>
    );
  }
}

const StyledNoTasks = styled(NoTasks)`
  text-align: center;
  font-size: 1.5em;
  line-height: 1.5;

  button {
    margin-top: 1em;
  }
  i {
    color: ${yellow};
    font-size: 6em;
  }
`;

export default StyledNoTasks;
