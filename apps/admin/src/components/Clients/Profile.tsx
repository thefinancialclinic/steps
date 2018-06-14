import BackButton from 'atoms/Buttons/BackButton';
import Chat from 'components/Chat/Chat';
import GoalList from 'components/Goals/GoalList';
import Sidebar from 'components/Sidebar/Sidebar';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Terms from 'routes/Coach/Terms';
import Tasks from 'routes/Coach/Clients/ProfileTasksList';
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
              <Route path={`${url}/terms`}>
                <Terms client={client} />
              </Route>
              {withAddTask && (
                <Route
                  path={`${url}/tasks/add`}
                  component={() => <h2>HOOK ME BACK UP</h2>}
                />
              )}
              <Route
                path={`${url}/tasks`}
                render={props => <Tasks client={client} />}
              />
              <Route path={`${url}/goals`} component={GoalList} />
              <Route path={`${url}/chat`} component={Chat} />
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
