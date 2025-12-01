"use client";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { searchPlaces } from "../../../redux/slices/searchSlice"; // adjust path
import {
  FiArchive, FiCoffee, FiCompass, FiHeart, FiSmile,
  FiShoppingBag, FiEyeOff, FiBook, FiGlobe, FiFilm,
  FiMoon, FiUsers
} from "react-icons/fi";

const categories = [
  { id: 1, name: "Historical", icon: FiArchive, slug: "historical" },
  { id: 2, name: "Cafe", icon: FiCoffee, slug: "cafe" },
  { id: 3, name: "Adventure", icon: FiCompass, slug: "adventure" },
  { id: 4, name: "Romantic", icon: FiHeart, slug: "romantic" },
  { id: 5, name: "Shopping", icon: FiShoppingBag, slug: "shopping" },
  { id: 6, name: "Religious", icon: FiBook, slug: "religious" },
  { id: 7, name: "Cultural", icon: FiGlobe, slug: "cultural" },
  { id: 8, name: "Entertainment", icon: FiFilm, slug: "entertainment" },
  { id: 9, name: "Nightlife", icon: FiMoon, slug: "nightlife" },
  { id: 10, name: "Family-friendly", icon: FiUsers, slug: "family-friendly" },
  { id: 11, name: "Pet-Friendly", icon: FiSmile, slug: "pet-friendly" },
  { id: 12, name: "Hidden Gems", icon: FiEyeOff, slug: "hidden-gems" },
];

export default function CategoryGrid() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCategoryClick = (slug) => {
    dispatch(searchPlaces({ query: slug }));
    router.push("/search");
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Explore by Category</h2>
        <p className="text-gray-600 mb-10">
          Pick what you love and let us guide your next outing
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map(({ name, icon: Icon, slug }) => (
            <button
              key={slug}
              onClick={() => handleCategoryClick(slug)}
              className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow-md hover:ring-2 hover:ring-orange-500 transition-all duration-200 flex flex-col items-center text-center"
            >
              <Icon className="text-3xl text-orange-500 mb-3 transition-transform duration-200 group-hover:scale-110 group-hover:text-orange-600" />
              <span className="font-medium text-gray-800 group-hover:text-orange-600 transition-colors">
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}