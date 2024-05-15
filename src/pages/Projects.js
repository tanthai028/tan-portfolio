import React from 'react';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';

const Projects = () => {
  return (
    <Box p={5} maxW="800px" mx="auto">
      <Heading as="h2" size="xl" mb={5}>Projects</Heading>
      <List spacing={3}>
        <ListItem>
          <Text fontWeight="bold">Full-Stack Job Scraper:</Text>
          <Text>A web application using Flask and JavaScript to scrape job listings.</Text>
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">Project 2:</Text>
          <Text>Brief description of another project you're proud of.</Text>
        </ListItem>
        <ListItem>
          <Text fontWeight="bold">Project 3:</Text>
          <Text>Brief description of another project you're proud of.</Text>
        </ListItem>
      </List>
    </Box>
  );
}

export default Projects;
