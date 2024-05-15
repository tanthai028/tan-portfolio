import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box p={5} maxW="800px" mx="auto" textAlign="center">
      <Heading as="h2" size="xl" mb={5}>Welcome to Tan's Portfolio</Heading>
      <Text fontSize="lg">This is the home page. Here, you can find information about me, my projects, and how to contact me.</Text>
    </Box>
  );
}

export default Home;
