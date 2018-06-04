import Button from 'atoms/Button';
import { AlertLevel } from 'components/Alert/types';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import NewClientForm from './NewClientForm';
import { createClient } from 'actions/clients';
import { addAlert } from 'actions/alerts';
import { History } from 'react-router';

const Content = styled.div`
  position: relative;
  padding: 2em 2em 6em 2em;
  height: 100%;

  button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

interface Props {
  className?: string;
  actions: { addAlert; createClient };
  history: History;
}

export class NewClient extends React.Component<Props> {
  createClient = clientData => {
    this.props.actions
      .createClient(clientData)
      .then(res => {
        this.props.history.push('/clients');
      })
      .catch(error => {
        this.props.actions.addAlert({
          type: AlertLevel.Error,
          message: error
        });
      });
  };

  render() {
    return (
      <div className="new-client">
        <Flex flexWrap="wrap">
          <Box width={[1, 1 / 2]} px={2}>
            <Content>
              <h2>Title</h2>
              <Box>
                Learn how this digital helper can help you achieve your dreams.
                It's a text message based program and will reach out to you once
                a day with reminders, content, and encouragement.
              </Box>
              <Button>Play Video</Button>
            </Content>
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Content>
              <NewClientForm onSubmit={this.createClient} />
            </Content>
          </Box>
        </Flex>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createClient, addAlert }, dispatch)
});

export default connect(null, mapDispatchToProps)(withRouter(NewClient));
