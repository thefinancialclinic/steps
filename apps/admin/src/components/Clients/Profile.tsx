import BackButton from 'atoms/Buttons/BackButton';
import Sidebar from 'components/Sidebar/Sidebar';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Tasks from 'routes/Coach/Clients/ProfileTasksList';
import TaskAdd from 'routes/Coach/Clients/ProfileTaskAdd';
import Chat from 'routes/Coach/Clients/ProfileChat';
import Goals from 'routes/Coach/Clients/Goals/Goals';
import styled from 'styled-components';

interface Props {
  actions?: any;
  children?: any;
  client: any;
  match?: any;
  user?: any;
  withAddTask: boolean;
}

class Client extends React.Component<Props, {}> {
  private static defaultProps = {
    withAddTask: false,
  };

  render() {
    const { client, match, withAddTask } = this.props;
    if (!client) return null;
    const { url, params } = match;

    return (
      <StyledClient>
        <Flex>
          <Box width={[1, 1 / 3]}>
            <Sidebar
              links={[
                { text: 'Tasks', to: `${url}/tasks` },
                { text: 'Goals', to: `${url}/goals` },
                { text: 'Chat', to: `${url}/chat` },
              ]}
            >
              <BackButton to="/clients" />
              <h2>
                {client.first_name} {client.last_name}
              </h2>
            </Sidebar>
          </Box>
          <Box width={[1, 2 / 3]} m={4}>
            <Switch>
              {withAddTask && (
                <Route
                  path={`${url}/tasks/add`}
                  render={() => <TaskAdd clientId={params.id} />}
                />
              )}
              <Route
                path={`${url}/tasks`}
                render={() => <Tasks client={client} />}
              />
              <Route path={`${url}/goals`} component={Goals} />
              <Route
                path={`${url}/chat`}
                render={({ match }) => <Chat client={client} match={match} />}
              />
              <Redirect exact from="" to={`${url}/tasks`} />
            </Switch>
          </Box>
        </Flex>
      </StyledClient>
    );
  }
}
const StyledClient = styled.div``;

export default Client;
