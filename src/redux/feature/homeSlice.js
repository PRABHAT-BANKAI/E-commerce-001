// redux/feature/homeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PRODUCT_URL = "http://localhost:3000/products";

export const fetchProducts = createAsyncThunk(
  "home/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(PRODUCT_URL);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to fetch products");
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    products: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
