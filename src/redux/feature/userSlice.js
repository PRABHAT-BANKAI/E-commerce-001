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
      const res = await axios.post(USER_URL, userData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);    
  //     const { data: existingUsers } = await axios.get(USER_URL);

  //     const isEmailTaken = existingUsers.some(
  //       (user) => user.email.toLowerCase() === userData.email.toLowerCase()
  //     );

  //     if (isEmailTaken) {
  //       return rejectWithValue("Email is already registered");
  //     }

      // const res = await axios.post(USER_URL, userData);
      // return res.data;
  // }

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
