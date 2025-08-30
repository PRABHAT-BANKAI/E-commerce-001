import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PRODUCT_URL = "http://localhost:3000/products";

// Thunks for CRUD operations

// CREATE
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct, thunkAPI) => {
    const response = await axios.post(PRODUCT_URL, newProduct);
    return response.data;
  }
);

// READ (GET all)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(PRODUCT_URL);
    return response.data;
  }
);

// UPDATE
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedProduct, thunkAPI) => {
    const { id } = updatedProduct;
    const response = await axios.put(`${PRODUCT_URL}/${id}`, updatedProduct);
    return response.data;
  }
);

// DELETE
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, thunkAPI) => {
    await axios.delete(`${PRODUCT_URL}/${productId}`);
    return productId;
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // UPDATE
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      });
  },
});

export default productSlice.reducer;