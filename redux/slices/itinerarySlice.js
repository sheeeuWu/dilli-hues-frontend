import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/itinerary`;

const initialState = {
  itinerary: null,
  loading: false,
  error: null,
};

// Async Thunk: Generate itinerary from AI prompt
export const generateItinerary = createAsyncThunk(
  "itinerary/generateItinerary",
  async ({ prompt, tags = [] }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, { prompt, tags });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const itinerarySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    clearItinerary: (state) => {
      state.itinerary = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateItinerary.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.itinerary = null;
      })
      .addCase(generateItinerary.fulfilled, (state, action) => {
        state.loading = false;
        state.itinerary = action.payload;
      })
      .addCase(generateItinerary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearItinerary } = itinerarySlice.actions;

export default itinerarySlice.reducer;