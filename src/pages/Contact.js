import React from 'react';
import { Box, Heading, Text, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';

const Contact = () => {
  return (
    <Box p={5} maxW="800px" mx="auto" textAlign="center">
      <Heading as="h2" size="xl" mb={5}>Contact</Heading>
      <Text fontSize="lg" mb={5}>Feel free to reach out to me through the form below.</Text>
      <form>
        <FormControl id="name" mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" required />
        </FormControl>
        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" required />
        </FormControl>
        <FormControl id="message" mb={4}>
          <FormLabel>Message</FormLabel>
          <Textarea rows={5} required />
        </FormControl>
        <Button colorScheme="teal" type="submit">Send</Button>
      </form>
    </Box>
  );
}

export default Contact;
