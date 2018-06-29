import React from 'react';
import RequestDetail from 'components/Chat/RequestDetail';
import { findById } from 'helpers';
import Main from 'atoms/Main';
import BackButton from 'atoms/Buttons/BackButton';
import { bindActionCreators } from 'redux';
import { createReply } from 'actions/clients';
import { connect } from 'react-redux';
import { addAlert } from 'actions/alerts';
import { AlertLevel } from 'components/Alert/types';

interface Props {
  user: any;
  match: any;
  messages: any;
  requests: any;
  actions: { createReply; addAlert };
}

export const addMessagesToRequest = (request, messages) => {
  const requestMessages = messages.filter(m => m.request_id === request.id);
  request.messages = requestMessages;
  return request;
};
// text: String,
// client: Client & { messages: Message[] },
// requestId: number,

export class RequestDetailRoute extends React.Component<Props> {
  onSubmit = ({ reply }) => {
    const { user, match, requests, messages } = this.props;
    this.props.actions
      .createReply(reply, user, requests, messages, match.params.requestId)
      .catch(err => {
        this.props.actions.addAlert({
          level: AlertLevel.Error,
          id: 'request-detail-error',
          message: err.message,
        });
      });
  };

  render() {
    const { user, match, messages, requests } = this.props;
    const request = findById(requests, match.params.requestId);
    const withMessages = addMessagesToRequest(request, messages);
    return (
      <Main>
        <BackButton to={`/clients/${user.id}/chat/help`} />
        <RequestDetail request={withMessages} onSubmit={this.onSubmit} />
      </Main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createReply, addAlert }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(RequestDetailRoute);
