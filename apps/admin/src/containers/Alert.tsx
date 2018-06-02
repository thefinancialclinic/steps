import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAlert } from '../actions/alerts';
import { Alerts } from 'components/Alert/Alerts';

const mapStateToProps = ({ alerts }) => {
  return {
    alerts
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addAlert }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
