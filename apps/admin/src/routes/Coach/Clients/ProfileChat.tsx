import React from 'react';
import Chat from 'components/Chat/Chat';
import { getClientMessagesAndRequests } from 'actions/clients';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router-dom';
import RequestDetail from 'routes/Coach/Clients/Chat/RequestDetail';

interface Props {
  actions: any;
  client: any;
  match?: any;
}

class ProfileChat extends React.Component<Props, {}> {
  componentWillMount() {
    const { actions, client } = this.props;
    actions.getClientMessagesAndRequests(client.id);
  }

  render() {
    const { client, match } = this.props;
    return (
      <Switch>
        <Route
          path={`/clients/:id/requests/:requestId`}
          render={props => (
            <RequestDetail client={client} match={props.match} />
          )}
        />
        <Route path='/clients/:id'>
          <Chat client={client} match={match} />
        </Route>
      </Switch>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClientMessagesAndRequests }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(ProfileChat);
