import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addAlert } from '../actions/alerts';
import AlertsList from 'components/Alert/AlertsList';

const mapStateToProps = ({ alerts }) => {
  return {
    alerts,
  };
};

export default connect(mapStateToProps)(AlertsList);
