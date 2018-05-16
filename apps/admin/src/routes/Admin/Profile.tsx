import React from 'react';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

interface Props {
  className?: string;
}

class Profile extends React.Component<Props, {}> {
  render () {
    return (
      <div className={this.props.className}>
        Admin Profile
      </div>
    );
  }
}
const StyledProfile = styled(Profile)`
display: flex;
`;

const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(StyledProfile);
