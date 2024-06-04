import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Button,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

function Navbar({ onSearch, onSortChange }) {
  const cartCount = useSelector((state) => state.cart.items.length);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  const showHomeButton = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debounceSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    onSortChange(e.target.value);
  };

  const debounceSearch = useCallback(
    debounce((query) => {
      if (query) {
        performSearch(query);
      } else {
        onSearch([]);
      }
    }, 500),
    []
  );

  const performSearch = async (query) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products?search=${query}`);
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error('Error searching products:', error);
      onSearch([]);
    }
  };

  const handleSearch = () => {
    debounceSearch(searchQuery);
  };

  return (
    <Box bg="teal" p={3} position="sticky" top={0} zIndex={1000} width="100%">
      <Flex justify="space-between" align="center" flexWrap="wrap">
        <Link to="/">
          <Image src="/images/logo.png" alt="Logo" boxSize={{ base: '40px', md: '50px' }} />
        </Link>
        <Flex
          align="center"
          flex="1"
          ml={{ base: 0, md: 4 }}
          mt={{ base: 2, md: 0 }}
          flexWrap="wrap"
          justify={{ base: 'center', md: 'flex-start' }}
          width={{ base: '100%', md: 'auto' }}
        >
          <Menu>
            <MenuButton as={Button} colorScheme="teal" rightIcon={<ChevronDownIcon />} mx={{ base: 2, md: 4 }}>
              Categories
            </MenuButton>
            <MenuList>
              {categories.map((category, index) => (
                <MenuItem key={index} onClick={() => handleCategoryClick(category)}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <InputGroup
            ml={{ base: 0, md: 4 }}
            mt={{ base: 2, md: 0 }}
            width={{ base: '100%', md: '200px', lg: '250px' }}
          >
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="white" />} />
            <Input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              _placeholder={{ color: 'white' }}
              color="white"
            />
          </InputGroup>
          <Select
            ml={{ base: 0, md: 4 }}
            mt={{ base: 2, md: 0 }}
            color="black"
            width={{ base: '100%', md: '150px' }}
            placeholder="All"
            value={sortOption || "All"} 
            onChange={handleSortChange}
          >
            <option value="price-asc" style={{ color: 'black' }}>Price: Low to High</option>
            <option value="price-desc" style={{ color: 'black' }}>Price: High to Low</option>
            <option value="name-asc" style={{ color: 'black' }}>Name: A to Z</option>
            <option value="name-desc" style={{ color: 'black' }}>Name: Z to A</option>
          </Select>
        </Flex>
        <Flex align="center" mt={{ base: 2, md: 0 }}>
          {showHomeButton && (
            <Link to="/" style={{ marginRight: '1rem' }}>
              <Button as="span" colorScheme="teal" variant="outline" color="white">
                Home
              </Button>
            </Link>
          )}
          <Link to="/cart" style={{ position: 'relative', marginRight: '1rem' }}>
            <Image src="/images/cart1.png" alt="Cart" boxSize="30px" />
            {cartCount > 0 && (
              <Text
                bg="red.500"
                color="white"
                fontWeight="bold"
                rounded="full"
                px={2}
                py={1}
                fontSize="xs"
                position="absolute"
                top="-8px"
                right="-8px"
              >
                {cartCount}
              </Text>
            )}
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;
