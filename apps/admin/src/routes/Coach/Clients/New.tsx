import { bindActionCreators } from 'redux';
import { Box, Flex } from 'grid-styled';
import { connect, History } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { black, white, green } from 'styles/colors';

import { addAlert } from 'actions/alerts';
import { Alert, AlertLevel } from 'components/Alert/types';
import { createClient } from 'actions/clients';
import Button from 'atoms/Buttons/Button';
import Main from 'atoms/Main';
import NewClientForm from 'forms/NewClientForm';
import VideoModal from 'components/Clients/VideoModal';

interface Props {
  className?: string;
  actions: {
    addAlert;
    createClient;
  };
  history: History;
}

interface State {
  showVideo: boolean;
}

export class ClientNew extends React.Component<Props, State> {
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
      .then(({ client }) => {
        this.props.history.push(`/clients/${client.id}`);
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
      <Wrapper width={[1]}>
        <Main className="new-client">
          {this.renderModal()}
          <Flex flexWrap="wrap">
            <Box width={[1, 1 / 2]} px={2}>
              <ContentLeft>
                <h2>Meet Roo</h2>
                <Box>
                  <p>
                    Learn how this digital helper can help you achieve your
                    dreams. It's a text message based program and will reach out
                    to you once a day with reminders, content, and
                    encouragement.
                  </p>
                </Box>
                <a onClick={this.toggleVideo}>
                  <Button>
                    Play Video<i className="material-icons">play_arrow</i>
                  </Button>
                </a>
              </ContentLeft>
            </Box>
            <Box width={[1, 1 / 2]} px={2}>
              <Content>
                <NewClientForm onSubmit={this.createClient} />
              </Content>
            </Box>
          </Flex>
        </Main>
      </Wrapper>
    );
  }
}

const Content = styled.div`
  position: relative;
  padding: 2em 2em 6em 2em;
  height: 100%;

  button {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    i {
      font-size: 14px;
      vertical-align: top;
    }
  }
`;

const gradient = `
  background: -webkit-linear-gradient(
    top,
    rgb(55, 118, 199) 0%,
    rgb(81, 175, 236) 20%,
    rgb(139, 212, 248) 45%,
    rgb(196, 230, 247) 65%,
    rgb(222, 180, 212) 100%
  );
  background: -o-linear-gradient(
    top,
    rgb(55, 118, 199) 0%,
    rgb(81, 175, 236) 20%,
    rgb(139, 212, 248) 45%,
    rgb(196, 230, 247) 65%,
    rgb(222, 180, 212) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgb(55, 118, 199) 0%,
    rgb(81, 175, 236) 20%,
    rgb(139, 212, 248) 45%,
    rgb(196, 230, 247) 65%,
    rgb(222, 180, 212) 100%
  );
  background: -moz-linear-gradient(
    top,
    rgb(55, 118, 199) 0%,
    rgb(81, 175, 236) 20%,
    rgb(139, 212, 248) 45%,
    rgb(196, 230, 247) 65%,
    rgb(222, 180, 212) 100%
  );
  background: linear-gradient(
    to bottom,
    rgb(55, 118, 199) 0%,
    rgb(81, 175, 236) 20%,
    rgb(139, 212, 248) 45%,
    rgb(196, 230, 247) 65%,
    rgb(222, 180, 212) 100%
  );
`;

const ContentLeft = Content.extend`
  color: ${black};
  button {
    color: ${green};
    background-color: ${white}

    &:hover {
      color: ${white};
    }
  }

  @media screen and (min-width: 40em) {
    color: white;
  }
`;

const Wrapper = styled.div`
  &:before {
    ${gradient} bottom: 0;
    content: '';
    display: none;
    left: 0;
    position: fixed;
    right: 50%;
    top: 0;
    z-index: -1;

    @media screen and (min-width: 40em) {
      display: block;
    }
  }
`;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ createClient, addAlert }, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(ClientNew));
