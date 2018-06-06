import React from 'react';
import { Flex, Box } from 'grid-styled';

interface Props {
  vertical?: boolean;
  horizontal?: boolean;
}

const Centered: React.SFC<Props> = ({
  vertical = true,
  horizontal = true,
  children,
}) => {
  const alignItems = vertical ? 'center' : 'flex-start';
  const justifyContent = horizontal ? 'center' : 'flex-start';
  return (
    <Flex alignItems={alignItems} justifyContent={justifyContent}>
      <Box>{children}</Box>
    </Flex>
  );
};

export default Centered;
