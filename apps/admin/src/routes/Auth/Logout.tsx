import { logout } from 'actions/auth';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class Logout extends React.Component<any, any> {
  componentWillMount() {
    this.props.actions.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ logout }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(Logout));
