import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

function Footer() {
  return (
    <Box bg="teal.500" p={4} color="white" mt={4}>
      <Text textAlign="center">
        © {new Date().getFullYear()} Hanger | <Link href="#" color="white" _hover={{ textDecoration: 'underline' }}>Privacy Policy</Link> | <Link href="#" color="white" _hover={{ textDecoration: 'underline' }}>Terms of Service</Link>
      </Text> 
    </Box>
  );
}

export default Footer;
