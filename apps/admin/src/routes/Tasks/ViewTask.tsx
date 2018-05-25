import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import { grey} from 'styles/colors';
import Badge from 'atoms/Badge';
import Panel from 'atoms/Panel';

interface Props {
  className?: string;
  client: any;
  task: any;
}

class ViewTask extends React.Component<Props, {}> {

  render () {
    const { className, client, task } = this.props;

    return (
      <Panel className={className}>
        <Flex alignItems='center' justifyContent='space-between'>
          <Box><Badge text={'income'} /></Box>
          <Box>
            <Link className='action-link' to={{pathname: `/clients/${client.id}/tasks/${task.id}/edit`}}>Edit</Link>
            <Link className='action-link' to=''>Delete</Link></Box>
        </Flex>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className='action-link'>Steps</div>
        {task.steps.map((step, index) => (
          <p>{step.text}</p>
        ))}
      </Panel>
    );
  }
}

const StyledViewTask = styled(ViewTask)`
  .action-link {
    color: ${grey};
    font-size: .8em;
    margin-right: 1em;
    text-decoration: none;
    text-transform: uppercase;
  }
`;

const mapStateToProps = (state, props) => ({
  task: state.tasks.tasks.find(t => t.id = props.match.params.taskId),
  client: state.clients.clients.find(c => c.id = props.match.params.id)
});

export default connect(mapStateToProps)(StyledViewTask);
