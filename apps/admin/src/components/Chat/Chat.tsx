import React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Box } from 'grid-styled';
import ChatHelp from './ChatHelp';
import ChatLog from './ChatLog';
import NavGroup from 'components/NavGroup/NavGroup';
import RequestDetail from 'routes/Coach/Clients/Chat/RequestDetail';

interface Props extends RouteComponentProps {
  className?: string;
  user: any;
  match?: any;
}

class Chat extends React.Component<Props, {}> {
  render() {
    const { className, user, match } = this.props;
    const { url, params } = match;

    return (
      <div className={className}>
        <Box mx={4} mt={4}>
          <NavGroup
            links={[
              { text: 'log', to: `/clients/${user.id}/chat/log` },
              { text: 'help', to: `/clients/${user.id}/chat/help` },
            ]}
          />
        </Box>
        <Switch>
          <Route
            path={`${url}/help/requests/:requestId/`}
            render={props => <RequestDetail user={user} match={props.match} />}
          />
          <Route path={`${url}/log`} render={() => <ChatLog user={user} />} />
          <Route path={`${url}/help`} render={() => <ChatHelp user={user} />} />
          <Redirect exact from="" to={`/clients/${user.id}/chat/log`} />
        </Switch>
      </div>
    );
  }
}

export default Chat;
