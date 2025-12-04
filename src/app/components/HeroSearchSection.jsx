"use client";
import { useState, useRef, useEffect } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";
import { FaLandmark, FaPaw, FaUtensils, FaTree, FaHeart } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import {
  FaCoffee,
  FaShoppingBag,
  FaChurch,
  FaPalette,
  FaFilm,
  FaMoon,
} from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { searchPlaces } from "../../../redux/slices/searchSlice"; // adjust path

const tabs = [
  { label: "Search All", icon: <IoHomeOutline size={18} />, categoryId: null },

  // High priority visual categories
  { label: "Historical", icon: <FaLandmark size={18} />, categoryId: 1 },
  { label: "Cafe", icon: <FaCoffee size={18} />, categoryId: 2 },
  { label: "Adventure", icon: <FaTree size={18} />, categoryId: 3 },
  { label: "Romantic", icon: <FaHeart size={18} />, categoryId: 4 },
  { label: "Shopping", icon: <FaShoppingBag size={18} />, categoryId: 5 },

  // Mid-priority
  { label: "Religious", icon: <FaChurch size={18} />, categoryId: 6 },
  { label: "Cultural", icon: <FaPalette size={18} />, categoryId: 7 },
  { label: "Entertainment", icon: <FaFilm size={18} />, categoryId: 8 },
  { label: "Nightlife", icon: <FaMoon size={18} />, categoryId: 9 },
  {
    label: "Family-friendly",
    icon: <MdFamilyRestroom size={18} />,
    categoryId: 10,
  },
  { label: "Pet-Friendly", icon: <FaPaw size={18} />, categoryId: 11 },
];

export default function HeroSearchSection() {
  const [activeTab, setActiveTab] = useState("Search All");
  const [query, setQuery] = useState("");
  //left right button ------
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  const scrollRef = useRef(null);

  // ------

  const dispatch = useDispatch();
  const router = useRouter();

  //left right button ------

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    // Hide left button when at starting position
    setShowLeftBtn(scrollLeft > 10);

    // Hide right button when scrolled to the end
    setShowRightBtn(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    // On mount and whenever the user scrolls
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);

    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  // ------

  const handleSearch = () => {
    const selectedTab = tabs.find((tab) => tab.label === activeTab);

    dispatch(
      searchPlaces({
        query,
        category: selectedTab?.categoryId, // passes category ID as `category`
      })
    );

    // Redirect to /search (optional)
    router.push("/search");
  };

  return (
    <section className="text-center mt-16 px-4">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold mb-10">Where to?</h1>

      {/* Tab Selector */}
      <div className="max-w-3xl mx-auto relative">
        {/* LEFT BUTTON (only show when needed) */}
        {showLeftBtn && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md
                     pt-2 pr-1.5 pb-2 pl-1 border rounded-md z-10 hidden sm:flex font-bold hover:bg-gray-100"
          >
            <FaChevronLeft className="text-orange-600" />
          </button>
        )}

        {/* TABS */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap overflow-x-auto whitespace-nowrap scrollbar-none gap-6
             text-lg sm:text-base font-semibold text-gray-800 mb-10 scrollbar-hide"
        >
          {tabs.map((tab) => (
            <button
              key={tab.label}
              className={`flex items-center gap-2 border-b-2 ${
                activeTab === tab.label
                  ? "border-orange-600"
                  : "border-transparent hover:border-orange-600"
              } pb-2 transition`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* RIGHT BUTTON (only show when needed) */}
        {showRightBtn && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md
                     pt-2 pr-1 pb-2 pl-1.5 border rounded-md z-10 hidden sm:flex font-bold hover:bg-gray-100"
          >
            <FaChevronRight className="text-orange-600" />
          </button>
        )}
      </div>

      <p className="text-base text-gray-600 max-w-2xl mx-auto mb-6">
        Not sure what you want? Just share your vibe — our AI gets it and
        suggests the perfect spots.
        <br />
        <span className="font-semibold text-[#f97316]">
          No more boring, rigid searches.
        </span>
      </p>

      {/* Search Input */}
      <div className="flex justify-center px-2 sm:px-4">
        <div className="flex w-full max-w-2xl bg-white rounded-full shadow-md overflow-hidden px-4 py-3 items-center border border-gray-200">
          <FaSearch className="text-gray-400 mr-2 sm:mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Places to go, things to do, or vibes to feel"
            className="flex-1 outline-none bg-transparent text-sm placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-full transition flex items-center justify-center min-w-[36px]"
          >
            <span className="block sm:hidden">
              <FaSearch className="w-4 h-4" />
            </span>
            <span className="hidden sm:block">Search</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4 italic text-center px-4">
        Try: “somewhere calm with art or history” or “budget-friendly weekend
        escape”
      </p>
    </section>
  );
}
