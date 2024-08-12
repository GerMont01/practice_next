import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      // Add the selected item to the cart
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // Create a new array without the item with the specified id
      state.items = state.items.filter((item) => item.uuid !== action.payload);
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;