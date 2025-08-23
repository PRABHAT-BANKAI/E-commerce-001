import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = "http://localhost:3000/users";

// fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await axios.get(USER_URL);
  return res.data;
});

// signup user with email check
export const signupUser = createAsyncThunk(
  "users/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      // check if email exists in DB
      const checkRes = await axios.get(`${USER_URL}?email=${userData.email}`);
      if (checkRes.data.length > 0) {
        return rejectWithValue("Email already exists. Please use another one.");
      }

      // if not exists -> create new user
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
      // fetch users
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

    // signup user
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
