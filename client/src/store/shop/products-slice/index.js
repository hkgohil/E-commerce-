import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productList: [],
  productDetails: null,
  loading: false,
  error: null,
};

// Async thunk to fetch all filtered products
export const fetchAllFilteredProducts = createAsyncThunk(
  "shopProducts/fetchAllFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const response = await axios.get("http://localhost:5000/api/admin/products/get");
    let products = response.data.data || [];

    // Apply filters
    if (filterParams && Object.keys(filterParams).length > 0) {
      if (filterParams.category && filterParams.category.length > 0) {
        products = products.filter(product =>
          filterParams.category.includes(product.category)
        );
      }
      if (filterParams.brand && filterParams.brand.length > 0) {
        products = products.filter(product =>
          filterParams.brand.includes(product.brand)
        );
      }
    }

    // Apply sorting
    if (sortParams) {
      switch (sortParams) {
        case "price-lowtohigh":
          products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
          break;
        case "price-hightolow":
          products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
          break;
        case "newest":
          products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "oldest":
          products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        default:
          break;
      }
    }

    return products;
  }
);

// Async thunk to fetch product details
export const fetchProductDetails = createAsyncThunk(
  "shopProducts/fetchProductDetails",
  async (productId) => {
    const response = await axios.get(`http://localhost:5000/api/admin/products/get`);
    const products = response.data.data || [];
    const product = products.find(p => p._id === productId);
    return product || null;
  }
);

// Async thunk to set product details
export const setProductDetails = createAsyncThunk(
  "shopProducts/setProductDetails",
  async (productDetails = null) => {
    return productDetails;
  }
);

const shopProductsSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllFilteredProducts
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // fetchProductDetails
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // setProductDetails
      .addCase(setProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload;
      });
  },
});

export const { clearProductDetails } = shopProductsSlice.actions;
export default shopProductsSlice.reducer;