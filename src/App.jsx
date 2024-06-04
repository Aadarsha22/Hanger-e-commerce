import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; 
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import CategoryProducts from './components/CategoryProducts';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <Router>
      <Flex direction="column" minHeight="100vh">
        <Navbar onSearch={handleSearch} onSortChange={handleSortChange} /> 
        <Box as="main" flex="1" p={4}>
          <Routes>
            <Route path="/" element={<HomePage searchQuery={searchQuery} sortOption={sortOption} />} /> 
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/category/:category" element={<CategoryProducts searchQuery={searchQuery} sortOption={sortOption} />} />
          </Routes>
        </Box>
        <Footer />
      </Flex>
    </Router>
  );
}

export default App;
