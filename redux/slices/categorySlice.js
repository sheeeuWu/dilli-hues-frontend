import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const initialState = {
  categories: [],
  loading: false,
  error: null,
  successMessage: null,
};

// GET all categories
export const fetchCategories = createAsyncThunk("categories/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(API_URL);
    return res.data.categories;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// ADD category
export const addCategory = createAsyncThunk("categories/add", async (name, { rejectWithValue }) => {
  try {
    const res = await axios.post(API_URL, { name });
    return res.data.category;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// UPDATE category
export const updateCategory = createAsyncThunk("categories/update", async ({ id, name }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, { name });
    return res.data.category;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

// DELETE category
export const deleteCategory = createAsyncThunk("categories/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || err.message);
  }
});

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },
    clearCategorySuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.successMessage = "Category added.";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(c => c.id === action.payload.id);
        if (index !== -1) state.categories[index] = action.payload;
        state.successMessage = "Category updated.";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(c => c.id !== action.payload);
        state.successMessage = "Category deleted.";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCategoryError, clearCategorySuccess } = categorySlice.actions;
export default categorySlice.reducer;