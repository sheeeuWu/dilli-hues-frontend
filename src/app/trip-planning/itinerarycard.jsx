"use client";
import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ItineraryCard({ step, stepNumber }) {
  const {
    title,
    time,
    location,
    description,
    image = "/images/placeholder.png", // fallback image
    tags = [],
    category = "Spot",
    hasParking = true,
    budget = "₹200–400",
  } = step;

  return (
    <div className="relative flex gap-4 bg-white shadow-sm hover:shadow-md transition-shadow rounded-xl p-4 border w-full">
      {/* Step number badge */}
      <div className="absolute -top-2 -left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">
        Step {stepNumber}
      </div>

      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-32 h-28 sm:w-40 sm:h-32 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold">{title}</h3>
            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md font-medium">
              {category}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPinIcon className="h-4 w-4 mr-1" />
            {location}
          </div>

          <p className="text-sm text-gray-700 mt-2">{description}</p>

          {/* Info row */}
          <div className="text-xs text-gray-500 mt-2 flex gap-4">
            <span>🚗 {hasParking ? "Has Parking" : "No Parking"}</span>
            <span>💸 Budget: {budget}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}