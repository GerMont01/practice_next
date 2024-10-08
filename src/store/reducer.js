import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: []
  },
  reducers: {
    setCart: (state,action) => {
      state.items = action.payload
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.uuid !== action.payload);
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart,addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;