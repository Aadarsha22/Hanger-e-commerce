import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { Box, Image, Text, Button, Flex, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

  // Calculate subtotal
  const subtotal = cart.items.reduce((total, item) => total + (parseFloat(item.price) || 0) * item.quantity, 0);

  // discount of 10 if subtotal is more than $200 ...
  let discount = 0;
  if (subtotal > 1000) {
    discount = 50;
  } else if (subtotal > 200) {
    discount = 5;
  } else if (subtotal > 2500) {
    discount = 100;
  }
  

  // Add VAT
  const vat = 2;

  // Calculate the total cost after discount and VAT
  const totalAfterDiscountAndVAT = subtotal - discount + vat;

  const handleCheckout = () => {
    navigate('/checkout', { state: { cartItems: cart.items } });
  };

  return (
    <Flex flexDirection={['column', 'column', 'row']} p={5} flexWrap="wrap">
      <Box
        flex="1"
        border="1px solid #E2E8F0"
        borderRadius="md"
        padding="20px"
        width={['100%', '100%', '70%']}
        mb={[4, 4, 0]}
        mr={10}
      >
        <Text fontSize={['xl', 'xl', '2xl']} mb={5}>Shopping Cart</Text>
        {cart.items.map(item => (
          <Flex key={item.id} alignItems="center" mb={4}>
            <Image src={item.image} alt={item.title} boxSize="100px" objectFit="contain" />
            <Box ml={4} flex="1">
              <Divider mt={2} mb={2} />
              <Text fontSize={['sm', 'sm', 'md']}>{item.title}</Text>
              <Box>
                <Flex justifyContent="center">
                  <Text>${(parseFloat(item.price) || 0).toFixed(2)}/per item</Text>
                </Flex>
                <Flex justifyContent="center" mt={2}>
                  <Button colorScheme="teal" variant="outline" size="sm" onClick={() => handleDecrement(item.id)}>-</Button>
                  <Text mx={2}>{item.quantity}</Text>
                  <Button colorScheme="teal" variant="outline" size="sm" onClick={() => handleIncrement(item.id)}>+</Button>
                </Flex>
              </Box>
              <Box p={1}>
                <Flex justifyContent="space-between">
                  <Text alignItems="center">${((parseFloat(item.price) || 0) * item.quantity).toFixed(2)}</Text>
                  <Button colorScheme="red" ml={2} onClick={() => dispatch(removeItem(item.id))}>Delete</Button>
                </Flex>
              </Box>
            </Box>
          </Flex>
        ))}
      </Box>
      {cart.items.length > 0 && (
        <Box
          flex="1"
          height="350px"
          border="1px solid #E2E8F0"
          borderRadius="md"
          padding="20px"
        
        >
          <Flex flexDirection="column" justifyContent="space-between" height="100%">
            <Flex flexDirection="column">
              <Text fontSize={['xl', 'xl', '2xl']} mb={5}>Order Summary</Text>
              <Divider mt={2} mb={2} />
              <Flex justifyContent="space-between" mb={4}>
                <Text fontSize={['md', 'md', 'xl']}>Subtotal:</Text>
                <Text fontSize={['md', 'md', 'xl']}>${subtotal.toFixed(2)}</Text>
              </Flex>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontSize={['md', 'md', 'xl']} color="green">Discount:</Text>
                <Text fontSize={['md', 'md', 'xl']} color="green">${discount.toFixed(2)}</Text>
              </Flex>
              <Flex justifyContent="space-between" mb={2}>
                <Text fontSize={['md', 'md', 'xl']} color="red">Tax:</Text>
                <Text fontSize={['md', 'md', 'xl']} color="red">${vat.toFixed(2)}</Text>
              </Flex>
              <Divider mt={2} mb={2} />
              <Flex justifyContent="space-between" mb={2}>
                <Text fontSize={['xl', 'xl', '2xl']}>Total:</Text>
                <Text fontSize={['xl', 'xl', '2xl']}>${totalAfterDiscountAndVAT.toFixed(2)}</Text>
              </Flex>
            </Flex>
            <Button colorScheme="teal" width={['100%', '100%', '100%']} alignSelf="center" onClick={handleCheckout}>Checkout</Button>
          </Flex>
        </Box>
      )}
    </Flex>
  );
} 

export default Cart;
