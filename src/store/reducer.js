import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    numOfItems: 0
  },
  reducers: {
    setCart: (state,action) => {
      state.items = action.payload.cart
      state.numOfItems = action.payload.numOfItems
    },
    addToCart: (state, action) => {
      state.numOfItems += 1;
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