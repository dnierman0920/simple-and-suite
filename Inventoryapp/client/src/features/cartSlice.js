import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log("action.payload", action.payload);
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    deleteItem: (state, action) => {
      const { productId, quantity, price } = action.payload.product;
      state.products = state.products.filter((product) => product.productId !== productId);
      state.quantity -= 1;
      state.total -= quantity * price;
    },

    addExistingProduct: (state, action) => {
      console.log("action.payload", action.payload);
      const { id, quantity, totalPrice } = action.payload;
      state.products = state.products.map((product) =>
        product.productId === id
          ? { ...product, quantity: product.quantity + quantity }
          : product
      );
      state.total += totalPrice;
      console.log("state.total", state.total);
    },

    incrementItemQuantity: (state, action) => {
      state.products = state.products.map((product) =>
        product.productId === action.payload.product.productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      state.total += action.payload.product.price;
    },

    decrementItemQuantity: (state, action) => {
      state.products = state.products.map((product) =>
        product.productId === action.payload.product.productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      state.total -= action.payload.product.price;
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  addExistingProduct,
  incrementItemQuantity,
  decrementItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
