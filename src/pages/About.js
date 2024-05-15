import React from 'react';
import { Box, Heading, Text, Image } from '@chakra-ui/react';
import profilePic from '../assets/profile.jpg';

const About = () => {
  return (
    <Box p={5} maxW="800px" mx="auto" textAlign="">
      <Image borderRadius="full" boxSize="150px" src={profilePic} alt="Profile Picture" mx="auto" mb={5} />
      <Heading as="h2" size="xl" mb={5}>About Me</Heading>
      <Text fontSize="lg">
        Hi, I'm Tan! I'm a New Graduate Computer Science major with with hands-on experience in Agile development, systems automation, and full-stack web applications.
      </Text>
      <br/>
      <Text fontSize="lg">
        I'm skilled in various programming languages and tools such as Python, C#, C++, JavaScript, and Git, and I'm dedicated to delivering high-quality projects. I'm looking for a full-time new grad opportunity as a software developer/engineer where I can contribute to a dynamic team. With a versatile skill set and a passion for rapid learning, I'm eager to make a meaningful impact.
      </Text>
    </Box>
  );
}

export default About;
