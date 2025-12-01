"use client";
import Image from "next/image";
import AreaSection from "./AreaSection";
import ReviewsSection from "./ReviewSection";
import MockSidebar from "./MockSidebar";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { FaFemale } from "react-icons/fa";

export default function PlaceDetail({ place }) {
  const imageSrc = place.images?.[0] || "/images/placeholder.png";
  const { ai_summary } = place;


  return (
    <div className="max-w-6xl mx-auto px-4 lg:flex gap-8 py-10 mt-24">
      {/* Left Main Content */}
      <div className="flex-1">
        {/* Header & Images */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div>
              <h1 className="text-3xl font-extrabold">{place.name}</h1>
              <p className="text-sm text-gray-600 mt-2">{place.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-pink-800 text-sm bg-pink-50 border border-pink-300 rounded-md px-4 py-2 mb-5 max-w-lg">
            <FaFemale className="text-lg" />
            <span>
             The contributor mentioned this place as <strong>safe for women</strong>.
            </span>
          </div>

          {/* Main Image */}
         <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-sm bg-gray-100">
  {place.images?.length > 0 ? (
    <Image
      src={imageSrc}
      alt={place.name}
      width={1200}
      height={675}
      className="object-cover w-full h-full"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
      No image available
    </div>
  )}
</div>

        </div>

        {/* AI Summary Box */}
        <div className="bg-orange-100 border-l-4 border-orange-500 p-5 rounded-xl shadow-sm mb-6">
          <h2 className="text-lg font-bold mb-2">
            💡 What’s special about this place? (AI-Powered Summary)
          </h2>
          <p className="text-sm text-gray-700">
            {/* This place offers a unique blend of historical architecture and lush
            greenery. Ideal for morning walks, quiet time, or photography
            enthusiasts. */}
            {ai_summary || "(Summary coming soon...)"}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500 mb-1">💰 Budget Per Head</p>
            <p className="font-semibold">{place.budget_per_head}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500 mb-1">🚗 Parking Available</p>
            <p className="font-semibold">{place.parking_available ? "Yes" : "No"}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500 mb-1">⏰ Best Time to Visit</p>
            <p className="font-semibold">{place.best_time_to_visit}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500 mb-1">🎟️ Entry Fee</p>
            <p className="font-semibold">₹{place.entry_fee}</p>
          </div>

          <div className="bg-orange-50 p-5 rounded-lg shadow-sm border border-orange-200 col-span-1 sm:col-span-2">
            <p className="text-orange-600 font-semibold text-sm mb-2">
              🗣️ Our contributor said:
            </p>
            <p className="text-gray-800 text-sm mb-3">
              {place.description ||
              "This place is a hidden gem in the heart of the city. Perfect for a peaceful day out with friends or family."}
            </p>
            <p className="text-sm text-gray-500 italic">
              {place.contributor_name
                ? `- ${place.contributor_name}, Contributor`
                : "- Anonymous Contributor"}
            </p>
          </div>
        </div>

        {/* Description */}
        {/* {place.description && (
          <p className="text-base text-gray-700 mb-6">{place.description}</p>
        )} */}

        {/* Area Info */}
        <AreaSection
          coordinates={{
            lat: parseFloat(place.latitude),
            lng: parseFloat(place.longitude),
          }}
          mapUrl={place.google_map_url}
              googleMapUrl={place.google_map_url}
  nearbyCafes={place.nearbyCafes || []}
  otherNearby={place.otherNearby || []}
  location={place.location}
        />
      </div>

      {/* Right Sidebar */}
      <MockSidebar placeName={place.name} />
    </div>
  );
}