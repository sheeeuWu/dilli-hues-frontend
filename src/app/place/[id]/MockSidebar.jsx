"use client";
import { useState } from "react";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";

export default function MockSidebar({ placeName }) {
  const [liked, setLiked] = useState(false);

  return (
    <aside className="w-full lg:w-[300px] mt-20 lg:mt-0">
      {/* Tours & Experiences */}
      {/* Explore & Verify */}
<div className="bg-white p-5 shadow-md rounded-xl border mb-6">
  <h3 className="text-lg font-bold mb-2">🔍 Explore & Verify</h3>
  <p className="text-sm text-gray-700 mb-2">
    Check Google Maps for directions, live reviews, photos, and hours.
  </p>
  <p className="text-sm text-gray-600 mb-4">
    Estimated travel time from your location: <strong>25 mins</strong> (by car).
  </p>
  <a
    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-700 transition"
  >
    View on Google Maps
  </a>
</div>


      {/* Quick Tips */}
      <div className="bg-white p-5 shadow-md rounded-xl border">
        <h3 className="text-lg font-bold mb-2">📝 Quick Tips</h3>
        <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
          <li>Arrive early to avoid crowds</li>
          <li>Carry water and sunscreen</li>
          <li>Photography is allowed in most areas</li>
        </ul>
      </div>
      {/* Action Buttons */}
{/* Action Buttons */}
{/* <div className="flex gap-4 mt-6">
  <button
    onClick={() => setLiked(!liked)}
    className="flex items-center text-sm font-semibold text-orange-700 hover:underline"
  >
    {liked ? (
      <SolidHeart className="h-5 w-5 mr-1 text-orange-700" />
    ) : (
      <OutlineHeart className="h-5 w-5 mr-1" />
    )}
    {liked ? "❤️ Liked" : "➕ Add to Liked Places"}
  </button>

  <button
    onClick={() =>
      navigator.share
        ? navigator.share({
            title: placeName,
            url: window.location.href,
          })
        : navigator.clipboard.writeText(window.location.href)
    }
    className="text-sm font-semibold text-blue-700 hover:underline"
  >
    🔗 Share with Friends
  </button>
</div> */}
{/* <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-semibold text-gray-700">
  <button
    onClick={() =>
      navigator.share
        ? navigator.share({
            title: place.name,
            url: window.location.href,
          })
        : navigator.clipboard.writeText(window.location.href)
    }
    className="flex items-center gap-1 hover:underline"
  >
    🔗 Share
  </button>

  <button className="flex items-center gap-1 hover:underline">
    ✍️ Review
  </button>

  <button
    onClick={() => setLiked(!liked)}
    className="flex items-center gap-1 hover:underline text-orange-600"
  >
    {liked ? "❤️ Saved" : "🤍 Save"}
  </button>
</div> */}



    </aside>
  );
}