import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : { items: [], totalQuantity: 0, totalAmount: 0 };
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id && item.size === newItem.size);
      
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      
      state.totalQuantity += newItem.quantity;
      state.totalAmount += newItem.price * newItem.quantity;
      
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const { id, size } = action.payload;
      const existingItem = state.items.find(item => item.id === id && item.size === size);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => !(item.id === id && item.size === size));
      }
      
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { id, size, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id && item.size === size);
      
      if (existingItem) {
        const quantityDiff = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDiff;
        state.totalAmount += existingItem.price * quantityDiff;
      }
      
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;