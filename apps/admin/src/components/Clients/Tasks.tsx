import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTasks } from 'actions/tasks';
import styled from 'styled-components';

interface Props {
  className?: string;
  actions: any;
  tasks: any;
}

class Tasks extends React.Component<Props, {}> {
  componentWillMount () {
    this.props.actions.getTasks();
  }

  render () {
    return (
      <div>
        <h2>Tasks</h2>
        <Link to="/clients/1/tasks/new">New Task</Link>
        {[...this.props.tasks].map((task, key) => (
          <div key={key}>{task.content}</div>
        ))}
      </div>
    );
  }
}

const StyledTasks = styled(Tasks)`
display: flex;
`;

const mapStateToProps = (state, props) => ({
  tasks: state.tasks.tasks
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getTasks }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledTasks);
