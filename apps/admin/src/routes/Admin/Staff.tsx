import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Panel from 'atoms/Panel';
import InputRow from 'components/Forms/InputRow';
import Button from 'atoms/Button';

interface Props {
}

class Staff extends React.Component<Props, {}> {
  render () {
    return (
      <BaseStaff>
        <div className='header'>
          <h1>Staff</h1>
          <Button>Invite Staff</Button>
        </div>
        <label>Name & Email</label>
        <Panel>
          <p>STUFF HERE</p>
          <Button>Edit</Button>
        </Panel>
      </BaseStaff>
    );
  }
}
const BaseStaff = styled.div`
  flex: 2;
  margin-left: 100px;
  margin-right: 100px;

  .header {
    display: flex;
    font-size: 16px;
    align-items: baseline;
    justify-content: space-between;
  }
`;

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
