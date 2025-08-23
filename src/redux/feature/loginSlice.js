import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = "http://localhost:3000/users";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.get(USER_URL);
      const users = response.data;

      const user = users.find((e) =>
          e.email.toLowerCase() === email.toLowerCase() &&
          e.password === password
      );

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;