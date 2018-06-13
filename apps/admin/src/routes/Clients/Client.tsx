import { getClients } from 'actions/clients';
import BackButton from 'atoms/Buttons/BackButton';
import Chat from 'components/Chat/Chat';
import GoalList from 'components/Goals/GoalList';
import Sidebar from 'components/Sidebar/Sidebar';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Terms from 'routes/Clients/Terms';
import Tasks from 'routes/Tasks/Tasks';
import styled from 'styled-components';

interface Props {
  className?: string;
  actions: any;
  client: any;
}

class Client extends React.Component<Props, {}> {
  componentWillMount() {
    this.props.actions.getClients();
  }

  render() {
    const { client } = this.props;
    if (!client) return null;

    return (
      <Flex className={this.props.className}>
        <Box width={[1, 1 / 3]}>
          <Sidebar
            links={[
              { text: 'Tasks', to: `/clients/${client.id}/tasks` },
              { text: 'Goals', to: `/clients/${client.id}/goals` },
              { text: 'Chat', to: `/clients/${client.id}/chat` },
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
            <Route path="/clients/:id/terms">
              <Terms client={client} />
            </Route>
            <Route path="/clients/:id/tasks" component={Tasks} />
            <Route path="/clients/:id/goals" component={GoalList} />
            <Route path="/clients/:id/chat" component={Chat} />
            <Redirect
              exact
              from="/clients/:id"
              to={`/clients/${client.id}/tasks`}
            />
          </Switch>
        </Box>
      </Flex>
    );
  }
}
const StyledClient = styled(Client)``;

const mapStateToProps = (state, props) => ({
  client: state.clients.clients.find(c => c.id == props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClients }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StyledClient);
