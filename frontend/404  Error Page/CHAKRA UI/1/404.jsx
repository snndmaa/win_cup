// NotFoundPage.js
import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const NotFoundPage = () => {
  return (
    <Box textAlign="center" mt="20">
      <Text fontSize="6xl" fontWeight="bold" mb="4">
        404 - Page Not Found
      </Text>
      <Text fontSize="xl" mb="8">
        Oops! The page you're looking for doesn't exist.
      </Text>
      <Button colorScheme="blue" as={Link} to="/">
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
