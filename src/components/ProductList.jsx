import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Box, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import ProductItem from './ProductItem';
import { addItem } from '../redux/cartSlice';

function ProductList({ searchQuery = '', sortOption, category }) {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category 
          ? `https://fakestoreapi.com/products/category/${category}`
          : 'https://fakestoreapi.com/products';
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [category]);

  const addToCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    toast({
      title: "Product Added.",
      description: `${product.title} has been added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  // Ensure searchQuery is a string
  const searchStr = String(searchQuery).toLowerCase();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchStr)
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.price - b.price;
    } else if (sortOption === 'price-desc') {
      return b.price - a.price;
    } else if (sortOption === 'name-asc') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'name-desc') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <Flex wrap="wrap" p={5} justifyContent="center" gap={6}>
      {sortedProducts.map(product => (
        <Box key={product.id} width={['100%', '48%', '31%']} mb={5}>
          <ProductItem product={product} addToCart={addToCart} />
        </Box>
      ))}
    </Flex>
  );
}

export default ProductList;
