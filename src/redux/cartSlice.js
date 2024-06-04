import { createSlice } from '@reduxjs/toolkit';

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const loadCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(),
    total: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        // If the item already exists in the cart, increment its quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        state.items.push(newItem);
      }

      state.total += newItem.price * newItem.quantity;
      saveCartToLocalStorage(state.items);
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      if (itemIndex >= 0) {
        state.total -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
      saveCartToLocalStorage(state.items);
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item) {
        item.quantity += 1;
        state.total += item.price;
      }
      saveCartToLocalStorage(state.items);
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.total -= item.price;
      }
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;


