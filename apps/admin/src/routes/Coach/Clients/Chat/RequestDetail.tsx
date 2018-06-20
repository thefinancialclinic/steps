import React from 'react';
import RequestDetail from 'components/Chat/RequestDetail';
import { findById } from 'helpers';
import Main from 'atoms/Main';
import BackButton from 'atoms/Buttons/BackButton';
import { bindActionCreators } from 'redux';
import { addClientMessage } from 'actions/clients';
import { connect } from 'react-redux';
import { addAlert } from 'actions/alerts';
import { AlertLevel } from 'components/Alert/types';

interface Props {
  user: any;
  match: any;
  actions: { addClientMessage(data): Promise<void>; addAlert };
}

export const addMessagesToRequest = (request, messages) => {
  const requestMessages = messages.filter(m => m.request_id === request.id);
  request.messages = requestMessages;
  return request;
};

export class RequestDetailRoute extends React.Component<Props> {
  onSubmit = data => {
    this.props.actions.addClientMessage(data).catch(err => {
      this.props.actions.addAlert({
        level: AlertLevel.Error,
        id: 'request-detail-error',
        message: err.message,
      });
    });
  };

  render() {
    const { user, match } = this.props;
    const { messages, requests } = user;
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
  actions: bindActionCreators({ addClientMessage, addAlert }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(RequestDetailRoute);
