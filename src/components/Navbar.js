import React from 'react';
import { Box, Flex, Avatar, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import profilePic from '../assets/profile.jpg'; // Make sure to adjust the path as needed

const Navbar = () => {
  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Avatar size="sm" src={profilePic} name="Tan" mr={2} />
          <Text fontSize="md" fontWeight="bold">Tan Thai</Text>
        </Flex>
        <Flex alignItems="center">
          <NavLink to="/" style={{ margin: '0 10px' }}>
            Home
          </NavLink>
          <NavLink to="/about" style={{ margin: '0 10px' }}>
            About Me
          </NavLink>
          <NavLink to="/projects" style={{ margin: '0 10px' }}>
            Projects
          </NavLink>
          <NavLink to="/resume" style={{ margin: '0 10px' }}>
            Resume
          </NavLink>
          <NavLink to="/contact" style={{ margin: '0 10px' }}>
            Contact
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
