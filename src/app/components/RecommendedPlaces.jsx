"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getSuggestedPlaces } from "../../../redux/slices/placeSlice";
import PlaceCard from "./PlaceCard";

export default function RecommendedPlaces() {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const { suggestedPlaces, loading } = useSelector((state) => state.place);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
  dispatch(getSuggestedPlaces());
}, [dispatch]);


  const scroll = (direction) => {
    const current = scrollRef.current;
    if (!current) return;

    const scrollAmount = 300;
    current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const checkScrollPosition = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition);
      return () => el.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);


  return (
    <section className="mt-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-1">You might like these</h2>
        <p className="text-sm text-gray-500 mb-4">More things to do in New Delhi</p>

        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full shadow-md p-2 hover:bg-orange-100"
            >
              <FaChevronLeft className="text-orange-600" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-2 scrollbar-hide"
          >
            {loading ? (
  <p className="text-gray-400">Loading suggestions...</p>
) : (
  suggestedPlaces.map((item) => {
    const image = item.images?.[0] || "/images/placeholder.png";


  return (
    <PlaceCard
      key={item.id}
      place={{
        id: item.id,
        image,
        title: item.name,
        subtitle: item.category?.name || "Spot",
        location: item.location,
      }}
      />
    );
  })
)}
          </div>

          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border rounded-full shadow-md p-2 hover:bg-orange-100"
            >
              <FaChevronRight className="text-orange-600" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}