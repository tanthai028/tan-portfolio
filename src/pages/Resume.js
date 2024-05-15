import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import resumePDF from '../assets/resume.pdf'; // Adjust the path as necessary

const Resume = () => {
  return (
    <Box p={5} maxW="800px" mx="auto" textAlign="center">
      <Heading as="h2" size="xl" mb={5}>Resume</Heading>
      <Box as="iframe"
        src={resumePDF}
        width="100%"
        height="1025px"
        style={{ border: 'none' }}
        title="Resume"
      />
    </Box>
  );
}

export default Resume;
