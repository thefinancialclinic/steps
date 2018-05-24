import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTask } from 'actions/tasks';
import styled from 'styled-components';

interface Props {
  className?: string;
  actions: any;
}

class EditTask extends React.Component<Props, {}> {
  newTask = (e) => {
    e.preventDefault();
    const content: any = this.refs.content;

    this.props.actions.createTask({
      steps: { foo: 'bar' },
      content: content.value,
    });
  }

  render () {
    return (
      <div>
        <h2>New Task</h2>
        <form onSubmit={this.newTask}>
          <input type='text' ref='content' />
          <button type='submit'>Do it</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createTask }, dispatch)
});

const StyledNewTask = styled(EditTask)`
`;

export default connect(mapStateToProps, mapDispatchToProps)(StyledNewTask);
