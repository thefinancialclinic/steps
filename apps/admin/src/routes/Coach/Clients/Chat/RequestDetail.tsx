import React from 'react';
import RequestDetail from 'components/Chat/RequestDetail';
import { findById } from 'helpers';
import Main from 'atoms/Main';
import BackButton from 'atoms/Buttons/BackButton';

interface Props {
  user: any;
  match: any;
}

export const addMessagesToRequest = (request, messages) => {
  const requestMessages = messages.filter(m => m.request_id === request.id);
  request.messages = requestMessages;
  return request;
};

export class RequestDetailRoute extends React.Component<Props> {
  render() {
    const { user, match } = this.props;
    const { messages, requests } = user;
    const request = findById(requests, match.params.requestId);
    const withMessages = addMessagesToRequest(request, messages);
    return (
      <Main>
        <BackButton to={`/clients/${user.id}/chat/help`} />
        <RequestDetail request={withMessages} />
      </Main>
    );
  }
}

export default RequestDetailRoute;
