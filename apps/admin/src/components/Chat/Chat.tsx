import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Box } from 'grid-styled';
import styled from 'styled-components';
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
          <Route path="/clients/:id/chat/log" component={ChatLog} />
          <Route path="/clients/:id/chat/help" component={ChatHelp} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  client: state.clients.clients.find(c => c.id == props.match.params.id),
});

export default connect(mapStateToProps)(Chat);
