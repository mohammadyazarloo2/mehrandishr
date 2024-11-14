"use client"
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.title === action.payload.title
      );
      if (!existingProduct) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        existingProduct.quantity++;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.title !== action.payload);
    },
    decraceQuantity: (state, action) => {
      const item = state.items.find((item) => item.title === action.payload);
      if (item) {
        if (item.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.title !== action.payload
          );
        } else {
          item.quantity--;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, decraceQuantity } = cartSlice.actions;
export default cartSlice.reducer;
