
// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "./slices/userSlice"; // Adjust path if needed
import placeReducer from "./slices/placeSlice";
import likedPlacesReducer from "./slices/likedPlacesSlice"
import searchReducer from "./slices/searchSlice"; // Import search slice
import itineraryReducer from "./slices/itinerarySlice"; // Import itinerary slice
import categoriesReducer from "./slices/categorySlice"; // Import categories slice
import safetySliceReducer from "./slices/safetySlice"; // Import safety slice

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  place: placeReducer,
  likedPlaces: likedPlacesReducer,
  search: searchReducer, // Add search slice
  itinerary: itineraryReducer, // Add itinerary slice
  // Add other slices here (e.g., org, product, etc.)
  categories: categoriesReducer, // Add categories slice
  safety: safetySliceReducer, // Add safety slice
});

// Persistence config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "search", "itinerary"], // only persist user slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
