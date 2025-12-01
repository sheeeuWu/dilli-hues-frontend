"use client";
import { useState } from "react";
import StaticHeader from "../components/StaticHeader";
import Footer from "../components/Footer";
import UserPromptForm from "../components/UserPromptForm";
import MapDisplay from "../components/MapDisplay";
import SkeletonLoader from "../components/SkeletonLoader";

// You’ll later replace with API response
const mockItinerary = [
  {
    title: "Breakfast at Ama Cafe",
    time: "9:00 AM – 10:00 AM",
    location: "Majnu Ka Tila",
    description: "Chill Tibetan-style cafe with great coffee and breakfast options.",
    coords: [77.2395, 28.7089],
  },
  {
    title: "Walk at Lodhi Garden",
    time: "10:30 AM – 12:00 PM",
    location: "Lutyens' Delhi",
    description: "Relaxing walk through greenery and tombs from the Lodhi era.",
    coords: [77.2195, 28.5916],
  },
  {
    title: "Quick Street Food at Janpath",
    time: "12:15 PM – 1:00 PM",
    location: "Connaught Place",
    description: "Wrap up with local snacks and quick shopping at Janpath market.",
    coords: [77.2186, 28.6328],
  },
];

export default function ItineraryPlanner() {
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState([]);

  const handleGenerate = async (finalPrompt) => {
    console.log("Prompt sent:", finalPrompt);
    setLoading(true);
    setItinerary([]);

    // Simulate loading delay
    setTimeout(() => {
      setItinerary(mockItinerary);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <StaticHeader />
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold mb-4">Plan Your Trip</h1>
          <p className="text-gray-600 mb-6">
            Describe your vibe and interests — we’ll suggest a personalized plan.
          </p>

          <UserPromptForm onGenerate={handleGenerate} />

          {loading && <SkeletonLoader />}

          {itinerary.length > 0 && (
            <div className="mt-10 space-y-6">
              {itinerary.map((item, i) => (
                <div key={i} className="bg-white border shadow-sm rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <span className="text-sm text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.location}</p>
                  <p className="text-sm text-gray-700 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Map goes here */}
        <div className="sticky top-20 h-[500px] rounded-lg overflow-hidden">
          <MapDisplay places={itinerary} />
        </div>
      </div>

      <Footer />
    </>
  );
}