import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { Box, Image, Text, Button, Flex, Input, FormControl, FormLabel, Textarea } from '@chakra-ui/react';

function ProductDetails({searchQuery}) {
  console.log('the search query is', searchQuery);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setFormState({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          image: response.data.image
        });
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://fakestoreapi.com/products/${id}`, formState)
      .then(response => {
        setProduct(response.data);
        setIsEditing(false);
      })
      .catch(error => console.error(error));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} p={5}>
      <Box width={{ base: '100%', md: '60%' }} pr={{ base: 0, md: 5 }} mb={{ base: 5, md: 0 }}>
        <Flex justifyContent="center">
          {product.image && (
            <Image src={product.image} alt={product.title} boxSize={{ base: '200px', md: '300px' }} objectFit="contain" />
          )}
        </Flex>
      </Box>
      <Box p={0} width={{ base: '100%', md: '40%' }}>
        {!isEditing ? (
          <>
            <Text mt={2} fontSize="2xl" fontWeight="bold">
              {product.title}
            </Text>
            <Box width="100%">
              <Text mt={2}>{product.description}</Text>
            </Box>
            <Text mt={2} fontSize="xl" color="teal.600">
              ${product.price}
            </Text>
            <Flex mt={4} align="center">
              <Button colorScheme="teal" onClick={handleAddToCart} mr={2}>
                Add to Cart
              </Button>
              <Button colorScheme="blue" onClick={() => setIsEditing(true)} ml={2}>
                Edit Product
              </Button>
            </Flex>
          </>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formState.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formState.description}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                type="number"
                value={formState.price}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="image"
                value={formState.image}
                onChange={handleInputChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" mr={3}>
              Save
            </Button>
            <Button colorScheme="red" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
}

export default ProductDetails;
