import React from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';
import { Box, Flex } from 'grid-styled';
import { svgBackgroundImageUrl } from 'styles';
import { darkBlue } from 'styles/colors';
import Alert from 'containers/Alert';
import Flex100 from 'atoms/Flex100';

class AuthLayout extends React.Component<any, any> {
  render() {
    return (
      <Flex100 height={1}>
        <Alert />
        <Flex100 flexWrap="wrap" height={1}>
          <Box width={[1, 3 / 4]}>
            <Header>A brighter financial future starts today</Header>
            <BackgroundImage />
          </Box>
          <Box width={[1, 1 / 4]} height="100%">
            {this.props.children}
          </Box>
        </Flex100>
      </Flex100>
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
