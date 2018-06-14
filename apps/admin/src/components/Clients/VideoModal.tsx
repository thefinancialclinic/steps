import React from 'react';
import styled from 'styled-components';

import Modal from 'components/Modal';

interface Props {
  embedURL: string;
  onClose: Function;
}

export class VideoModal extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.onClose();
  }

  render() {
    const { embedURL } = this.props;
    return (
      <StyledModal>
        <i className="material-icons" onClick={this.close}>
          close
        </i>
        <Container>
          <iframe
            src={`${embedURL}?rel=0&controls=0&showinfo=0&autoplay=1`}
            frameBorder="0"
          />
        </Container>
      </StyledModal>
    );
  }
}

const StyledModal = styled(Modal)`
  margin: auto;

  div:first-child {
    padding: 54px;
    position: relative;
  }

  i {
    cursor: pointer
    font-size: 20px;
    position: absolute;
    z-index: 100;
    top: 24px;
    left: 24px;
  }
`;

const Container = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default VideoModal;
