import React from 'react';
import { getClients } from 'actions/clients';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClientProfile from 'components/Clients/Profile';

interface Props {
  actions: any;
  client: any;
  user: any;
}

class Client extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getClients();
  }

  render() {
    const { client } = this.props;
    if (!client) return null;

    return <ClientProfile {...this.props} withAddTask />;
  }
}

const mapStateToProps = (state, props) => {
  console.log(state);
  return {
    client: state.clients.clients.find(c => c.id == props.match.params.id),
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClients }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Client);
