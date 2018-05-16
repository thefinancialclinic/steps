import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Panel from 'atoms/Panel';

interface Props {
  className?: string;
}

class Signup extends React.Component<Props, {}> {
  render () {
    return (
      <div className={this.props.className}>
        <div className='left'>word</div>
        <Panel className='right'>
          hey yo
        </Panel>
      </div>
    );
  }
}
const StyledSignup = styled(Signup)`
  display: flex;
  height: 100%;
  align-self: stretch;
  align-items: stretch;

  .left {
    width: 100%;
  }

  .right {
    border-radius: 0;
    height: 100%;
    width: 400px;
  }
`;

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledSignup);
