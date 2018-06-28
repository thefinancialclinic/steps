import React from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import { svgBackgroundImageUrl } from 'styles';
import { darkBlue } from 'styles/colors';
import Alert from 'containers/Alert';

class AuthLayout extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Alert />
        <Flex flexWrap="wrap">
          <Box width={[1, 3 / 4]}>
            <Header>A brighter financial future starts today</Header>
            <BackgroundImage />
          </Box>
          <Box width={[1, 1 / 4]}>{this.props.children}</Box>
        </Flex>
      </div>
    );
  }
}

const Header = styled.h1`
  padding: 0 1em;
  text-align: center;
  font-size: 72px;
  font-weight: 600;
  color: ${darkBlue};
`;

const BackgroundImage = styled.div`
  height: 626px;
  width: 825px;
  max-height: 100%;
  max-width: 100%;
  background-image: ${svgBackgroundImageUrl('login-bg.svg')};
  background-size: contain;
  background-repeat: no-repeat;
`;

export default withRouter(AuthLayout);
