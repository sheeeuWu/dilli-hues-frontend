import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/likedplaces`;


const initialState = {
  likedPlaces: [],
  loading: false,
  error: null,
  successMessage: null,
};

// GET liked places
export const fetchLikedPlaces = createAsyncThunk("liked/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.likedPlaces;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// POST like a place
export const likePlace = createAsyncThunk("liked/like", async (place_id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(API_URL, { place_id }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.liked;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// DELETE unlike a place
export const unlikePlace = createAsyncThunk("liked/unlike", async (place_id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${API_URL}/${place_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return place_id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Slice
const likedPlacesSlice = createSlice({
  name: "likedPlaces",
  initialState,
  reducers: {
    clearLikedError: (state) => {
      state.error = null;
    },
    clearLikedSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikedPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.likedPlaces = action.payload;
      })
      .addCase(fetchLikedPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(likePlace.fulfilled, (state, action) => {
        state.likedPlaces.push(action.payload);
        state.successMessage = "Place liked.";
      })
      .addCase(likePlace.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(unlikePlace.fulfilled, (state, action) => {
        state.likedPlaces = state.likedPlaces.filter(p => p.place_id !== action.payload);
        state.successMessage = "Place unliked.";
      })
      .addCase(unlikePlace.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearLikedError, clearLikedSuccess } = likedPlacesSlice.actions;
export default likedPlacesSlice.reducer;