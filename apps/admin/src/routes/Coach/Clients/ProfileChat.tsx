import React from 'react';
import Chat from 'components/Chat/Chat';
import { getClientMessages } from 'actions/clients';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface Props {
  actions: any;
  client: any;
}

class ProfileChat extends React.Component<Props, {}> {
  componentWillMount() {
    const { actions, client } = this.props;
    actions.getClientMessages(client.id);
  }

  render() {
    const { client } = this.props;
    return <Chat client={client} />;
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClientMessages }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(ProfileChat);
