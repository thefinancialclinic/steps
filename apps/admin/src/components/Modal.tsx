import Close from 'atoms/Icons/Close';
import Panel from 'atoms/Panel';
import { Flex, Box } from 'grid-styled';
import React from 'react';
import styled from 'styled-components';
import { black } from 'styles/colors';

interface Props {
  className?: string;
  onClose?(): void;
  size?: ModalSize;
}

export enum ModalSize {
  Medium = 'medium',
  Large = 'large',
  FullWidth = 'fullWidth',
}

const getModalWidth = (size: ModalSize) => {
  switch (size) {
    case ModalSize.Medium:
      return '800px';
    case ModalSize.Large:
      return '940px';
    default:
      return '100%';
  }
};

const getContainerWidth = (size: ModalSize) => {
  switch (size) {
    case ModalSize.Medium:
      return [1, 1, 3 / 4];
    case ModalSize.Large:
      return [1, 1, 4 / 5];
    default:
      return [1];
  }
};

const Modal: React.SFC<Props> = ({
  children,
  onClose,
  size = ModalSize.FullWidth,
}) => {
  return (
    <Container>
      <Box width={getModalWidth(size)} m="auto">
        <Panel>
          {onClose && <Close onClick={onClose} />}
          <Box width={getContainerWidth(size)} m="auto" mb="1em">
            {children}
          </Box>
        </Panel>
      </Box>
    </Container>
  );
};

const Container = styled(Flex)`
  background: ${black}50;
  bottom: 0;
  left: 0;
  position: absolute;
  padding: 1em;
  right: 0;
  top: 0;
  z-index: 1;
`;

export default Modal;
