// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = "http://localhost:3000/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(USER_URL);
  return res.data;
});

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data: existingUsers } = await axios.get(USER_URL);

      const isEmailTaken = existingUsers.some(
        (user) => user.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (isEmailTaken) {
        return rejectWithValue("Email is already registered");
      }

      // Validation checks
      if (!userData.name.trim()) return rejectWithValue("Enter a valid name");
      if (!userData.email.trim()) return rejectWithValue("Enter a valid email");
      if (!userData.password.trim() || userData.password.length < 6)
        return rejectWithValue(
          "Password length should be greater than or equal to 6"
        );
      if (!userData.phoneno.trim() || userData.phoneno.length < 10)
        return rejectWithValue(
          "Phone number length should be at least 10 digits"
        );
      if (!userData.confirmpass.trim())
        return rejectWithValue("Enter a valid confirm password");
      if (userData.password !== userData.confirmpass)
        return rejectWithValue("Confirm password does not match");

      const res = await axios.post(USER_URL, userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    signupSuccess: false,
  },
  reducers: {
    resetSignupState: (state) => {
      state.signupSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.signupSuccess = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.signupSuccess = false;
      });
  },
});

export const { resetSignupState } = userSlice.actions;
export default userSlice.reducer;
