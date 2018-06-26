import { addAlert } from 'actions/alerts';
import { createClient } from 'actions/clients';
import Button from 'atoms/Buttons/Button';
import Main from 'atoms/Main';
import { AlertLevel } from 'components/Alert/types';
import VideoModal, { VIDEO_MODAL } from 'components/Clients/VideoModal';
import NewClientForm from 'forms/NewClientForm';
import { Box, Flex } from 'grid-styled';
import React from 'react';
import { connect, History } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { black, green, white } from 'styles/colors';
import Modal from 'containers/Modal';
import { showModal, hideModal } from 'actions/modals';

interface Props {
  className?: string;
  actions: {
    addAlert;
    createClient;
    showModal;
    hideModal;
  };
  history: History;
}

export class ClientNew extends React.Component<Props> {
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

  render() {
    const { actions } = this.props;
    return (
      <Wrapper>
        <Main className="new-client">
          <Modal id={VIDEO_MODAL} onClose={actions.hideModal(VIDEO_MODAL)}>
            <VideoModal embedURL="https://www.youtube.com/embed/WpHtdkKQz8Q" />
          </Modal>
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
                <Button onClick={() => actions.showModal(VIDEO_MODAL)}>
                  Play Video<i className="material-icons">play_arrow</i>
                </Button>
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
    background-color: ${white};

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
  actions: bindActionCreators(
    { createClient, addAlert, showModal, hideModal },
    dispatch,
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(ClientNew));
