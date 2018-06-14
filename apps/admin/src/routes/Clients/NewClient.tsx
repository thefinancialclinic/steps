import { addAlert } from 'actions/alerts';
import { createClient } from 'actions/clients';
import Button from 'atoms/Buttons/Button';
import Main from 'atoms/Main';
import { Alert, AlertLevel } from 'components/Alert/types';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { connect } from 'react-redux';
import { History } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import NewClientForm from '../../forms/NewClientForm';
import VideoModal from 'components/Clients/VideoModal';

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
  actions: { addAlert: (alert: Alert) => any; createClient };
  history: History;
}

interface State {
  showVideo: boolean;
}

export class NewClient extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
    };
    this.toggleVideo = this.toggleVideo.bind(this);
  }

  createClient = clientData => {
    this.props.actions
      .createClient(clientData)
      .then(res => {
        this.props.history.push('/clients');
      })
      .catch(error => {
        this.props.actions.addAlert({
          level: AlertLevel.Error,
          message: error.message,
          id: 'new-client-error',
        });
      });
  };

  toggleVideo() {
    this.setState({ showVideo: !this.state.showVideo });
  }

  renderModal() {
    if (this.state.showVideo) {
      return (
        <VideoModal
          embedURL="https://www.youtube.com/embed/WpHtdkKQz8Q"
          onClose={this.toggleVideo}
        />
      );
    }
  }

  render() {
    return (
      <Main className="new-client">
        {this.renderModal()}
        <Flex flexWrap="wrap">
          <Box width={[1, 1 / 2]} px={2}>
            <Content>
              <h2>Title</h2>
              <Box>
                Learn how this digital helper can help you achieve your dreams.
                It's a text message based program and will reach out to you once
                a day with reminders, content, and encouragement.
              </Box>
              <a onClick={this.toggleVideo}>
                <Button>Play Video</Button>
              </a>
            </Content>
          </Box>
          <Box width={[1, 1 / 2]} px={2}>
            <Content>
              <NewClientForm onSubmit={this.createClient} />
            </Content>
          </Box>
        </Flex>
        <Link to="/">Home</Link>
      </Main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createClient, addAlert }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(NewClient));
