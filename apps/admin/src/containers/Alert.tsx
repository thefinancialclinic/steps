import AlertsList from 'components/Alert/AlertsList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeAlert } from 'actions/alerts';

const mapStateToProps = ({ alerts }) => {
  return {
    alerts,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removeAlert }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertsList);
