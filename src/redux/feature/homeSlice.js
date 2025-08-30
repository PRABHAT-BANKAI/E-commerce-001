import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PRODUCT_URL = "http://localhost:3000/products";

export const fetchProducts = createAsyncThunk(
  'home/fetchProducts',
  async ({ rejectWithValue }) => {
    try {
      const res = await axios.get(PRODUCT_URL);
      return res.data;
    } catch (err) {
      return rejectWithValue("products is not fetch");
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    products:[],
    error: null,
    loading: false
  },
  reducers: {
    getRandomProducts: (state, action) => {
      const { arr, count, category } = action.payload;
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      state[category] = shuffled.slice(0, count);
    }
  },
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

export const { getRandomProducts } = homeSlice.actions;
export default homeSlice.reducer;