"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";

export default function SearchCard({
  id,
  image,
  title,
  location,
  description,
  tags = [],
  category = "Cafe",
  hasParking = true,
  budget = "₹200–400",
}) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/place/${id}`)}
      className="relative flex gap-4 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl p-4 border mb-6 w-full max-w-5xl mx-auto cursor-pointer"
    >
      {/* Category badge */}
      <span className="absolute top-2 right-2 bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-md font-medium">
        {category}
      </span>

      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-36 h-28 sm:w-48 sm:h-36 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{location}</p>
          <p className="text-gray-700 mt-2 text-sm">{description}</p>

          {/* Small info row */}
          <div className="text-xs text-gray-500 mt-2 flex gap-4">
            <span>🚗 {hasParking ? "Has Parking" : "No Parking"}</span>
            <span>💸 Budget: {budget}</span>
          </div>
        </div>

        {/* Tags and Buttons */}
        <div
          className="mt-3 flex flex-wrap gap-y-2 sm:flex-nowrap sm:items-center sm:justify-between"
          onClick={(e) => e.stopPropagation()} // 🛑 Prevents routing on button click
        >
          <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
            {Array.isArray(tags) &&
  tags.map((tag, i) => (
    <span
      key={i}
      className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
    >
      {tag}
    </span>
  ))}

          </div>

          {/* Action Buttons */}
          <div className="flex gap-6 items-center">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center text-sm text-orange-600 hover:underline"
            >
              {liked ? (
                <SolidHeart className="h-4 w-4 mr-1 text-orange-600" />
              ) : (
                <OutlineHeart className="h-4 w-4 mr-1" />
              )}
              {liked ? "Liked" : "Add to Liked Places"}
            </button>

            <button className="text-sm text-gray-700 hover:underline font-medium">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}