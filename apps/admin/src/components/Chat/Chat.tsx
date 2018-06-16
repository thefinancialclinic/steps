import React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Box } from 'grid-styled';
import ChatHelp from './ChatHelp';
import ChatLog from './ChatLog';
import NavGroup from 'components/NavGroup/NavGroup';

interface Props extends RouteComponentProps {
  className?: string;
  client: any;
}

class Chat extends React.Component<Props, {}> {
  render() {
    const { className, client } = this.props;

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
          <Route path="/clients/:id/chat/log">
            <ChatLog client={client} />
          </Route>
          <Route path="/clients/:id/chat/help">
            <ChatHelp />
          </Route>
          <Redirect exact from="" to={`/clients/${client.id}/chat/log`} />
        </Switch>
      </div>
    );
  }
}

export default Chat;
