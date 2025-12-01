"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  GoogleMap,
  LoadScript,
  Marker
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import { useDispatch } from "react-redux";
import { createPlace } from "../../../redux/slices/placeSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchCategories } from "../../../redux/slices/categorySlice"; 


// const categories = [
//   { id: 1, name: "Accommodation" },
//   { id: 2, name: "Restaurant" },
//   { id: 3, name: "Things to Do" },
//   { id: 4, name: "Shopping" },
//   { id: 5, name: "Attraction" },
//   { id: 6, name: "Event" },
//   { id: 7, name: "Transportation" },
//   { id: 8, name: "Other" },
// ];

const containerStyle = {
  width: "100%",
  height: "260px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090,
};

export default function AddPlaceStep1({ onNext }) {
  
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [touched, setTouched] = useState(false);
  const [location, setLocation] = useState("");
  const [latLng, setLatLng] = useState(defaultCenter);
  const [loading, setLoading] = useState(false);
  const { categories, loading: categoryLoading, error: categoryError } = useSelector(state => state.categories);


 const {
  ready,
  value,
  setValue,
  suggestions: { status, data },
  clearSuggestions,
} = usePlacesAutocomplete({
  requestOptions: {
    location: { lat: () => 28.6139, lng: () => 77.2090 },
    radius: 20000, // optional, still useful
    componentRestrictions: { country: "in" }, // ✅ restrict to India
  },
  debounce: 300,
});

  useEffect(() => {
  dispatch(fetchCategories());
}, [dispatch]);


  const handleSelect = async (description) => {
    setValue(description, false);
    clearSuggestions();
    const results = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(results[0]);
    setLatLng({ lat, lng });
    setLocation(description);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setTouched(true);
  if (!name || !selectedCategory) return;

  const payload = {
    name,
    category_id: selectedCategory.id,
    location,
    latitude: latLng.lat,
    longitude: latLng.lng,
  };

    setLoading(true);

  try {
    const res = await dispatch(createPlace(payload)).unwrap();
    if (res && res.id) {
      // Pass the created place to Step 2
      onNext(res); // or onNext({ id: res.id, ...payload }) if needed
    }
    } catch (error) {
    console.error("Failed to create place:", error);
  } finally {
    setLoading(false);
  }
};



  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      // libraries={["places"]}
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 space-y-10 mt-15">
        <h1 className="text-4xl font-bold">Add a place</h1>

        {/* Stepper */}
        <div className="flex gap-6 items-center text-base font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center bg-orange-600 text-white rounded-full">1</div>
            <span>Basic details</span>
          </div>
          <div className="w-6 h-0.5 bg-gray-300" />
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-7 h-7 flex items-center justify-center border border-gray-400 rounded-full">2</div>
            <span>More details about the place</span>
          </div>
        </div>

        {/* Name Field */}
        <div>
          <label className="block text-lg font-medium mb-2">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border rounded-md px-4 py-3 text-base focus:outline-none ${
              touched && !name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter name of the place"
          />
          {touched && !name && <p className="text-red-500 text-sm mt-1">This field is required</p>}
        </div>

        {/* Category Field */}
        <div>
  <label className="block text-lg font-medium mb-2">
    Which category best describes this place?
  </label>

  {categoryLoading ? (
    <p className="text-sm text-gray-500">Loading categories...</p>
  ) : categoryError ? (
    <p className="text-sm text-red-500">{categoryError}</p>
  ) : (
    <div className="flex gap-4 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => setSelectedCategory(cat)}
          className={`px-5 py-2 border rounded-full text-base font-medium transition ${
            selectedCategory?.id === cat.id
              ? "bg-orange-600 text-white border-orange-600"
              : "border-gray-300 text-gray-800 hover:border-orange-600"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )}

  {touched && !selectedCategory && (
    <p className="text-red-500 text-sm mt-2">This field is required</p>
  )}
</div>


        {/* Location Field with Autocomplete */}
        <div>
          <label className="block text-lg font-medium mb-2">Location</label>
          <input
            value={value}
            onChange={(e) => {
              const val = e.target.value;
              setValue(val);
            }}
            placeholder="Search for a place in Delhi..."
            className="w-full border rounded-md px-4 py-3 text-base"
          />
          {status === "OK" && value.length >= 4 && (
            <div className="border rounded-md mt-2 bg-white max-h-60 overflow-y-auto shadow-lg z-50">
              {data.map(({ place_id, description }) => (
                <div
                  key={place_id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSelect(description)}
                >
                  {description}
                </div>
              ))}
            </div>
          )}
          {location && <p className="text-sm text-gray-600 mt-2">Selected: {location}</p>}
        </div>

        {/* Google Map with Marker */}
        <div className="w-full mt-4 rounded-xl border overflow-hidden">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={latLng}
            zoom={14}
          >
            <Marker position={latLng} />
          </GoogleMap>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-3 rounded-full"
        >
          {loading ? (
    <>
      <CircularProgress size={20} color="inherit" />
      Saving...
    </>
  ) : (
    "Continue"
  )}
        </button>
      </form>
    </LoadScript>
  );
}