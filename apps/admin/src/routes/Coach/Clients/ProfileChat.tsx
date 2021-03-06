import React from 'react';
import Chat from 'components/Chat/Chat';
import { getClientMessagesAndRequests } from 'actions/clients';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router-dom';
import RequestDetail from 'routes/Coach/Clients/Chat/RequestDetail';

interface Props {
  actions: any;
  user: any;
  match?: any;
  messages: any;
  requests: any;
}

class ProfileChat extends React.Component<Props, {}> {
  componentWillMount() {
    const { actions, user } = this.props;
    actions.getClientMessagesAndRequests(user.id);
  }

  render() {
    const { user, match, messages, requests } = this.props;
    return (
      <Switch>
        <Route
          path={`/clients/:id/chat/requests/:requestId`}
          render={props => (
            <RequestDetail
              user={user}
              messages={messages}
              requests={requests}
              match={props.match}
            />
          )}
        />
        <Route path="/clients/:id">
          <Chat
            user={user}
            messages={messages}
            requests={requests}
            match={match}
          />
        </Route>
      </Switch>
    );
  }
}

const mapStateToProps = (state, props: Props) => {
  return {
    messages: state.clients.clientMessages[props.user.id],
    requests: state.clients.clientRequests[props.user.id],
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClientMessagesAndRequests }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileChat);
