"use client";

import { FaTrophy } from "react-icons/fa";

export default function LeaderboardTeaser() {
  return (
    <section className="bg-orange-50 text-black px-6 py-10 rounded-xl my-12 shadow-md w-full max-w-5xl mx-auto">
      <div className="flex flex-col items-center text-center space-y-4">
        <FaTrophy className="text-4xl text-orange-500 animate-bounce-slow" />

        <h2 className="text-2xl md:text-3xl font-bold">
          Leaderboard Coming Soon!
        </h2>

        <p className="text-md md:text-lg max-w-2xl font-medium text-gray-700">
          Post your favorite places in Delhi and climb to the top of the community leaderboard.
          <br className="hidden sm:block" />
          Get recognized for your discoveries!
        </p>

        <button
          disabled
          className="bg-gray-800 text-white px-6 py-3 rounded-full font-semibold cursor-not-allowed opacity-80"
        >
          🚧 Coming Soon
        </button>
      </div>
    </section>
  );
}