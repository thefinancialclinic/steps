import React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Box } from 'grid-styled';
import ChatHelp from './ChatHelp';
import ChatLog from './ChatLog';
import NavGroup from 'components/NavGroup/NavGroup';
import RequestDetail from './RequestDetail';

interface Props extends RouteComponentProps {
  className?: string;
  client: any;
  match?: any;
}

class Chat extends React.Component<Props, {}> {
  render() {
    const { className, client, match } = this.props;
    const { url, params } = match;

    return (
      <div className={className}>
        <Box mx={4} mt={4}>
          <NavGroup
            links={[
              { text: 'log', to: `/clients/${client.id}/chat/log` },
              { text: 'help', to: `/clients/${client.id}/chat/help` },
            ]}
          />
        </Box>
        <Switch>
          <Route path={`${url}/help/requests/:requestId/`}>
            <RequestDetail />
          </Route>
          <Route
            path={`${url}/log`}
            render={() => <ChatLog client={client} />}
          />
          <Route
            path={`${url}/help`}
            render={() => <ChatHelp client={client} />}
          />
          <Redirect exact from="" to={`/clients/${client.id}/chat/log`} />
        </Switch>
      </div>
    );
  }
}

export default Chat;
