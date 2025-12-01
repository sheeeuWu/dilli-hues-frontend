"use client";
import { useState } from "react";

const CATEGORIES = [
  "Family-Friendly",
  "Budget-Friendly",
  "Near Metro",
  "Photogenic",
  "Historical",
  "Night Views",
  "Peaceful",
  "Nature",
  "Romantic",
  "Pet-Friendly",
];

export default function UserPromptForm({ onGenerate }) {
  const [input, setInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    const finalPrompt = selectedCategories.length
      ? `${input.trim()} (Preferences: ${selectedCategories.join(", ")})`
      : input.trim();

    onGenerate({ prompt: finalPrompt, tags: selectedCategories });

  };

  return (
    <div>
      <textarea
        className="w-full border rounded-md p-3 text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
        rows={4}
        placeholder="e.g., I have 6 hours in Delhi, want something relaxing with good food."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="mt-4">
        <p className="text-sm font-medium mb-2 text-gray-700">Optional: Pick interests</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                selectedCategories.includes(category)
                  ? "bg-orange-600 text-white border-orange-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-orange-600 text-white px-5 py-2 text-sm font-medium rounded-md hover:bg-orange-700 transition"
      >
        Generate Itinerary
      </button>
    </div>
  );
}