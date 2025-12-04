import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/places`;


const initialState = {
  places: [],
  selectedPlace: null,
  suggestedPlaces: [],
  loading: false,
  error: null,
  successMessage: null,
};

// Create Place
export const createPlace = createAsyncThunk(
  "place/createPlace",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${API_URL}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.place;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Get All Approved Places
export const getPlaces = createAsyncThunk("place/getPlaces", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}`);
    return res.data.places;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Get Place by ID
export const getPlaceById = createAsyncThunk("place/getPlaceById", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// Get Places by Category
export const getPlacesByCategory = createAsyncThunk(
  "place/getPlacesByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/category/${categoryId}`);
      return res.data.places;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Update Place
export const updatePlace = createAsyncThunk(
  "place/updatePlace",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.place;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Delete Place
export const deletePlace = createAsyncThunk("place/deletePlace", async (id, { rejectWithValue }) => {
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

// Get Suggested Places (Random, Cached)
export const getSuggestedPlaces = createAsyncThunk(
  "place/getSuggestedPlaces",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/suggestions`);
      return res.data.suggested;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);


const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    clearPlaceError: (state) => {
      state.error = null;
    },
    clearPlaceSuccess: (state) => {
      state.successMessage = null;
    },
    resetSelectedPlace: (state) => {
      state.selectedPlace = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Place created successfully";
        state.places.push(action.payload);
      })
      .addCase(createPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getPlaces.fulfilled, (state, action) => {
        state.places = action.payload;
      })
      .addCase(getPlaces.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getPlaceById.fulfilled, (state, action) => {
  const { place, google_map_url, nearbyCafes, otherNearby, ai_summary } = action.payload;

  state.selectedPlace = {
    ...place,
    google_map_url,
    nearbyCafes,
    otherNearby,
    ai_summary
  };
})

      .addCase(getPlaceById.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getPlacesByCategory.fulfilled, (state, action) => {
        state.places = action.payload;
      })

      .addCase(updatePlace.fulfilled, (state, action) => {
        state.successMessage = "Place updated successfully";
        state.selectedPlace = action.payload;
        // Optional: update in `places` list if needed
      })

      .addCase(deletePlace.fulfilled, (state, action) => {
        state.successMessage = action.payload;
        state.selectedPlace = null;
      })
            .addCase(getSuggestedPlaces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuggestedPlaces.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestedPlaces = action.payload;
      })
      .addCase(getSuggestedPlaces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const {
  clearPlaceError,
  clearPlaceSuccess,
  resetSelectedPlace,
} = placeSlice.actions;

export default placeSlice.reducer;