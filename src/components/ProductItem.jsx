import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Text, Button, Flex, VStack, Grid, GridItem, Center } from '@chakra-ui/react';

function ProductItem({ product, addToCart }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} display="flex" flexDirection="column" alignItems="center">
      <Grid templateRows="auto 1fr auto" gap={3} height="300px" width="100%">
        <GridItem as={Center}>
          <Image 
            src={product.image} 
            alt={product.title} 
            boxSize="150px" 
            objectFit="contain" 
          />
        </GridItem>
        <GridItem as={Center}>
          <VStack textAlign="center">
            <Text 
              fontSize="xl" 
              fontWeight="semibold" 
              as="h4" 
              lineHeight="tight"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.title}
            </Text>
            <Text>${product.price}</Text>
          </VStack>
        </GridItem>
        <GridItem as={Center}>
          <Flex justifyContent="center" alignItems="center" width="100%">
            <Link to={`/product/${product.id}`}>
              <Button colorScheme="teal" size="sm" mr={2}>
                View Details
              </Button>
            </Link>
            <Button colorScheme="teal" size="sm" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default ProductItem;
