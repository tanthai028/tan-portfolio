import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const Wrapper = ({ children }) => {
  return (
    <Flex direction="column" minH="150vh">
      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default Wrapper;
