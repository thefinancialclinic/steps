import AlertsList from 'components/Alert/AlertsList';
import { connect } from 'react-redux';

const mapStateToProps = ({ alerts }) => {
  return {
    alerts,
  };
};

export default connect(mapStateToProps)(AlertsList);
