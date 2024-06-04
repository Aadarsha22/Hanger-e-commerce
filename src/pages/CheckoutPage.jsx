import React, { useState } from 'react';
import { Box, Button, Divider, Grid, Image, Text, Flex, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

function CheckoutPage() {
  const location = useLocation();
  const { cartItems = [] } = location.state || {};

  // subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  //  discount if subtotal is more than $200
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

 
  const totalAfterDiscountAndVAT = subtotal - discount + vat;

  // total quantity
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  // State for card payment 
  const [cardNumber, setCardNumber] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayWithVisa = () => {
    //handle payment with Visa  
    console.log('Paying with Visa');
  };

  return (
    <Box mt="8" borderWidth="1px" borderRadius="lg" p="4">
      <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={8}>
         {/* My Orders  */}
        <Box>
          <Text as="h2" fontSize="xl" mb={1}>My Orders</Text>
          <Divider my="4" />
          <Box maxHeight="400px" overflowY="auto">
            {cartItems.length === 0 ? (
              <Text>No items in cart</Text>
            ) : (
              cartItems.map((item, index) => (
                <Box key={index} textAlign="center" mb="4">
                  <Flex alignItems="center">
                    <Image src={item.image} alt={item.name} boxSize="50px" mr="2" />
                    <Box>
                      <Text>{item.name}</Text>
                      <Text color="green">Rs.{item.price}</Text>
                      <Text>Quantity: {item.quantity}</Text>
                    </Box>
                  </Flex>
                </Box>
              ))
            )}
          </Box>
        </Box>

        {/* Order Summary */}
        <Box>
          <Text as="h2" fontSize="xl" mb={1}>Order Summary</Text>
          <Divider my="4" />
          <Box mb="4">
            <Text fontWeight="bold">Total Items:</Text>
            <Text>{totalQuantity}</Text>
          </Box>
          <Box mb="4">
            <Text fontWeight="bold">Total Price:</Text>
            <Text>${totalAfterDiscountAndVAT.toFixed(2)}</Text>
          </Box>
          <Box mb="4">
            <Text fontWeight="bold">Shipping:</Text>
            <Text color="green">Free</Text>
          </Box>
        </Box>

        {/* Payment Method */}
        <Box>
          <Image src='/images/card.png' alt='visa logo' height='34px' width='34px' />
          
          <Divider my="4" />
          <Text as="h4" fontSize="xl" mb={1}>Debit/Credit Card</Text>
          <Box mb="4">
            <FormControl mb="4">
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Image src='/images/visa.png' alt='visa logo' height='40px' width='40px' />
                <Image src='/images/bank.png' alt='bank' height='40px' width='40px' />
              </Grid>
              <FormLabel>Card Number</FormLabel>
              <Input
                type="text"
                placeholder="Card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Name on Card</FormLabel>
              <Input
                type="text"
                placeholder="Name on card"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Expiration Date</FormLabel>
              <Input
                type="text"
                placeholder="MM/YY"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>CVV</FormLabel>
              <Input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </FormControl>
          </Box>
          <Divider my="4" />
          <Box textAlign="center">
            <Flex justify="center" gap="4">
              <Button colorScheme="teal" onClick={handlePayWithVisa}>Pay with Visa</Button>
            </Flex>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default CheckoutPage;
