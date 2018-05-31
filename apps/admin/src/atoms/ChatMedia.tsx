import React from 'react';
import styled from 'styled-components';

import {
  blue,
  brown,
  green,
  grey,
  pink,
  yellow,
  white,
  colorFromString
} from 'styles/colors';

const backgroundColors = [blue, brown, green, pink, yellow];

interface Props {
  title?: string;
  url: string;
  image?: string;
}

class ChatMedia extends React.Component<Props, {}> {
  domain() {
    return new URL(this.props.url).hostname;
  }

  renderMedia() {
    if (this.props.title || this.props.image) {
      return (
        <div className="media">
          <div className="title">{this.props.title}</div>
        </div>
      );
    }
  }

  render() {
    return (
      <Container {...this.props}>
        <a href={this.props.url}>
          {this.renderMedia()}
          <div className="domain">{this.domain()}</div>
        </a>
      </Container>
    );
  }
}

const Container = styled<Props, 'div'>('div')`
  max-width: 266px;

  a {
    text-decoration: none;
  }

  .media {
    background-color: ${({ url }) => colorFromString(url, backgroundColors)};
    padding: 30px 20px;
    background-image: ${({ image }) => (image ? `url("${image}")` : 'none')};
    background-size: cover;

    .title {
      color: ${white};
      font-family: 'Tiempos', serif;
      font-size: 26px;
      font-weight: 600;
      max-width: 50%;
    }
  }

  .domain {
    font-family: 'Calibre', sans-serif;
    font-size: 14px;
    color: ${grey};
    background-color: ${white};
    padding: 15px 20px;
  }
`;

export default ChatMedia;
