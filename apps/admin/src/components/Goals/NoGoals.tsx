import Button from 'atoms/Buttons/Button';
import Panel from 'atoms/Panel';
import { Box } from 'grid-styled';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { yellow } from 'styles/colors';
import { Client } from 'reducers/clients';

interface Props {
  className?: string;
  client: Client;
}

class NoGoals extends React.Component<Props, {}> {
  render() {
    const { className, client } = this.props;

    return (
      <Box width={1} p={4} className={className}>
        <Panel>
          <div>
            <i className="material-icons">star</i>
          </div>
          <div>Create your first goal.</div>
          <Box m={2}>
            <Link to={`/clients/${client.id}/goals/new`}>
              <Button>Add Goal</Button>
            </Link>
          </Box>
        </Panel>
      </Box>
    );
  }
}

const StyledNoGoals = styled(NoGoals)`
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

export default StyledNoGoals;
