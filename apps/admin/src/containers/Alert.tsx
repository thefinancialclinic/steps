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

export default connect(mapStateToProps)(Alerts);
