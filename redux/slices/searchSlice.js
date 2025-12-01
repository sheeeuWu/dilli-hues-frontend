import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/search`;


const initialState = {
  placesByCategory: [],
  moreSuggestedPlaces: [],
  summaryText: "",
  loading: false,
  error: null,
  successMessage: null,
};

// Search Places
export const searchPlaces = createAsyncThunk(
  "search/searchPlaces",
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL, { params });
      return res.data; // contains all 3: places_by_category, more_suggested_places, summary_text
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// 🔄 Index All Places to OpenSearch
export const indexPlaces = createAsyncThunk(
  "search/indexPlaces",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/index`);
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchError: (state) => {
      state.error = null;
    },
    clearSearchSuccess: (state) => {
      state.successMessage = null;
    },
    resetSearchResults: (state) => {
      state.placesByCategory = [];
      state.moreSuggestedPlaces = [];
      state.summaryText = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.placesByCategory = action.payload.places_by_category || [];
        state.moreSuggestedPlaces = action.payload.more_suggested_places || [];
        state.summaryText = action.payload.summary_text || "";
      })
      .addCase(searchPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(indexPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(indexPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(indexPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearSearchError,
  clearSearchSuccess,
  resetSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;