import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

// Async thunk to add a review
export const addReview = createAsyncThunk(
  "shopReview/addReview",
  async ({ productId, userId, userName, reviewMessage, reviewValue }) => {
    const response = await axios.post("http://localhost:5000/api/shop/reviews/add", {
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    return response.data;
  }
);

// Async thunk to get reviews for a product
export const getReviews = createAsyncThunk(
  "shopReview/getReviews",
  async (productId) => {
    const response = await axios.get(`http://localhost:5000/api/shop/reviews/${productId}`);
    return response.data;
  }
);

const shopReviewSlice = createSlice({
  name: "shopReview",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // addReview
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally add the new review to the list
        if (action.payload.success) {
          // You might want to refresh the reviews list here
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // getReviews
      .addCase(getReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data || [];
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearReviews } = shopReviewSlice.actions;
export default shopReviewSlice.reducer;