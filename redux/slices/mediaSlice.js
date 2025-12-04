import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/media`;


const initialState = {
  images: [],
  loading: false,
  error: null,
  successMessage: null,
};

// Upload place images (uses multipart/form-data)
export const uploadPlaceImages = createAsyncThunk(
  "placeMedia/uploadPlaceImages",
  async ({ placeId, files }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const res = await axios.post(`${API_URL}/${placeId}/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.images; // Returns updated image array
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// Delete an image from a place (by index)
export const deletePlaceImage = createAsyncThunk(
  "placeMedia/deletePlaceImage",
  async ({ placeId, imageIndex }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `${API_URL}/media/${placeId}/images/${imageIndex}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.images; // Returns updated image array
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const placeMediaSlice = createSlice({
  name: "placeMedia",
  initialState,
  reducers: {
    clearMediaError: (state) => {
      state.error = null;
    },
    clearMediaSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload
      .addCase(uploadPlaceImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadPlaceImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
        state.successMessage = "Images uploaded successfully";
      })
      .addCase(uploadPlaceImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deletePlaceImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlaceImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
        state.successMessage = "Image deleted successfully";
      })
      .addCase(deletePlaceImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMediaError, clearMediaSuccess } = placeMediaSlice.actions;
export default placeMediaSlice.reducer;