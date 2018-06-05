import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Panel from 'atoms/Panel';
import InputRow from 'components/Forms/InputRow';
import Button from 'atoms/Button';

interface Props {
  className?: string;
}

class Profile extends React.Component<Props, {}> {
  render() {
    return (
      <div className={this.props.className}>
        <Panel>
          <InputRow label="profile picture" />
          <InputRow label="name" />
          <InputRow label="email" />
          <InputRow label="password" />
          <Button>Edit</Button>
        </Panel>
      </div>
    );
  }
}
const StyledProfile = styled(Profile)`
  flex: 2;
  margin-left: 100px;
  margin-right: 100px;
`;

export default StyledProfile;
