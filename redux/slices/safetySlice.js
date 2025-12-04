import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/safety`;

// Submit feedback
export const submitSafetyFeedback = createAsyncThunk(
  "safety/submit",
  async ({ place_id, felt_safe, comment }, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, { place_id, felt_safe, comment });
      return response.data.feedback;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Get safety stats
export const fetchSafetyStats = createAsyncThunk(
  "safety/fetchStats",
  async (placeId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${placeId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const initialState = {
  feedback: null,
  stats: null,
  loading: false,
  error: null,
  successMessage: null,
};

const safetyFeedbackSlice = createSlice({
  name: "safety",
  initialState,
  reducers: {
    clearSafetyError: (state) => {
      state.error = null;
    },
    clearSafetySuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit feedback
      .addCase(submitSafetyFeedback.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitSafetyFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
        state.successMessage = "Feedback submitted successfully.";
      })
      .addCase(submitSafetyFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch stats
      .addCase(fetchSafetyStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSafetyStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchSafetyStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSafetyError, clearSafetySuccess } = safetyFeedbackSlice.actions;
export default safetyFeedbackSlice.reducer;