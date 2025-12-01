import { FiChevronDown, FiTruck } from "react-icons/fi";

export default function TravelTime({ time = "15 mins", mode = "car" }) {
  const travelIcon = mode === "walk" ? "🚶" : <FiTruck size={16} />;

  return (
    <div className="flex flex-col items-center justify-center text-sm text-gray-500 py-4">
      {/* Arrow above */}
      <FiChevronDown className="text-gray-400 text-xl mb-1" />

      {/* Travel time row */}
      <div className="flex items-center gap-2 mb-1">
        <span>{travelIcon}</span>
        <span>{time} travel</span>
        {/* <div className="w-24 border-t border-dashed border-gray-300"></div> */}
      </div>

      {/* Arrow below */}
      <FiChevronDown className="text-gray-400 text-xl mt-1" />
    </div>
  );
}