import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: {
    items: [],
    total: 0,
  },
  loading: false,
  error: null,
};

// Async thunk to add item to cart
export const addToCart = createAsyncThunk(
  "shopCart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post("http://localhost:5000/api/shop/cart/add", {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

// Async thunk to fetch cart items
export const fetchCartItems = createAsyncThunk(
  "shopCart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`);
    return response.data;
  }
);

// Async thunk to remove item from cart
export const removeFromCart = createAsyncThunk(
  "shopCart/removeFromCart",
  async ({ userId, productId }) => {
    const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`);
    return response.data;
  }
);

// Async thunk to update cart item quantity
export const updateCartItemQuantity = createAsyncThunk(
  "shopCart/updateCartItemQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put("http://localhost:5000/api/shop/cart/update-cart", {
      userId,
      productId,
      quantity,
    });
    return response.data;
  }
);

const shopCartSlice = createSlice({
  name: "shopCart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = {
        items: [],
        total: 0,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.loading = false;
        // You might want to update the cart items here if the API returns updated cart
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchCartItems
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data || { items: [], total: 0 };
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // removeFromCart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data || { items: [], total: 0 };
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // updateCartItemQuantity
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.data || { items: [], total: 0 };
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = shopCartSlice.actions;
export default shopCartSlice.reducer;