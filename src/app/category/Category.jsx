"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchCard from "../components/SearchCard";
import SearchCardSkeleton from "../components/SearchCardSkeleton";
import { getPlacesByCategory } from "../../../redux/slices/placeSlice";

const slugToIdMap = {
  historical: 1,
  cafe: 2,
  adventure: 3,
  romantic: 4,
  shopping: 5,
  religious: 6,
  cultural: 7,
  entertainment: 8,
  nightlife: 9,
  "family-friendly": 10,
  "pet-friendly": 11,
  "hidden-gems": 12,
};

export default function CategoryPage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  const categoryId = slugToIdMap[categorySlug];

  const {
    places = [],
    loading,
    error,
  } = useSelector((state) => state.place || {});

  useEffect(() => {
    if (categoryId) {
      dispatch(getPlacesByCategory(categoryId));
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-orange-700 font-medium text-lg">
            Fetching places in {categorySlug} category...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-36">
      <h1 className="text-3xl font-bold mb-2 capitalize">
        Places in {categorySlug} Category
      </h1>
      <p className="text-gray-600 mb-6">
        Discover approved places in {categorySlug}. Explore now!
      </p>

      {places.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No places found for this category.
        </p>
      ) : (
        <InfiniteScroll
          dataLength={places.length}
          hasMore={false}
          loader={<SearchCardSkeleton />}
          endMessage={
            <p className="text-center text-sm text-gray-500 mt-4">
              You’ve reached the end of the list.
            </p>
          }
        >
          {places.map((item) => {
            const image = item.images?.[0] || "/images/placeholder.png";
            return (
              <SearchCard
                id={item.id}
                key={item.id}
                image={image}
                title={item.name}
                location={item.location}
                description={item.description}
                tags={item.tags}
                category={item.category?.name || "Other"}
                hasParking={item.parking_available}
                budget={`₹${item.entry_fee}`}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
}