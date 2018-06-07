import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import Panel from 'atoms/Panel';
import InputRow from 'components/Forms/InputRow';
import Button from 'atoms/Button';

interface Props {}

class Organization extends React.Component<Props, {}> {
  render() {
    return (
      <BaseOrganization>
        <Panel>
          <InputRow label="Organization Logo" />
          <InputRow label="Name" />
          <Button>Edit</Button>
        </Panel>
      </BaseOrganization>
    );
  }
}
const BaseOrganization = styled.div`
  flex: 2;
  margin-left: 100px;
  margin-right: 100px;
`;

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Organization);
