import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { Box, Flex, useToast } from '@chakra-ui/react';
import ProductItem from './ProductItem'; // Import ProductItem component

function CategoryProducts({ onSortChange }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast(); // Initialize the useToast hook

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    // when the product is added to cart a success message is shown using a toast function 
    toast({
      title: "Product Added.",
      description: `${product.title} has been added to your cart.`,
      status: "success",
      duration: 1000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleSortChange = (sortOption) => {
    // Pass the sorting option to the parent component
    onSortChange(sortOption);
  };

  return (
    <Box p={5}>
      <Flex wrap="wrap" justify="center" p={5} gap="5">
        {products.map((product) => (
          <Box key={product.id} width={['100%', '50%', '33.33%']} mb={4}>
            <ProductItem product={product} addToCart={handleAddToCart} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default CategoryProducts;
