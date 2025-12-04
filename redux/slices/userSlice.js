import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;


// Initial State
const initialState = {
  loading: false,
  error: null,
  userInfo: null,
  token: null,
  users: [],
  selectedUser: null,
  successMessage: null,
};

// Async Thunks

export const signUp = createAsyncThunk("user/signUp", async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, formData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const signIn = createAsyncThunk("user/signIn", async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, credentials);
    const { token, userData } = response.data;

    // Store in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userData));

    return { token, userInfo: userData };
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const getUsers = createAsyncThunk("user/getUsers", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.users;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const getUserById = createAsyncThunk("user/getUserById", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.message;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = null;
      state.userInfo = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
    clearUserError: (state) => {
      state.error = null;
    },
    clearUserSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.userInfo;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
        state.successMessage = "User updated successfully";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.successMessage = action.payload;
      });
  },
});

// Exports
export const { logoutUser, clearUserError, clearUserSuccess } = userSlice.actions;
export default userSlice.reducer;