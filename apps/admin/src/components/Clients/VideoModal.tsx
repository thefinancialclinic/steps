import React from 'react';
import styled from 'styled-components';

interface Props {
  embedURL: string;
}

export const VIDEO_MODAL = 'VIDEO_MODAL';

export class VideoModal extends React.Component<Props, {}> {
  render() {
    const { embedURL } = this.props;
    return (
      <Container>
        <iframe
          src={`${embedURL}?rel=0&controls=0&showinfo=0&autoplay=1`}
          frameBorder="0"
        />
      </Container>
    );
  }
}

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
