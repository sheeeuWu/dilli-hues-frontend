"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import StaticHeader from "../../components/StaticHeader";
import Footer from "../../components/Footer";
import PlaceDetail from "./PlaceDetail";
import { getPlaceById } from "../../../../redux/slices/placeSlice";
import SearchCardSkeleton from "../../components/SearchCardSkeleton";

export default function Page() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedPlace, loading, error } = useSelector((state) => state.place);

  useEffect(() => {
    if (id) {
      dispatch(getPlaceById(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <StaticHeader />

      <main className="min-h-screen">
        {loading || !selectedPlace ? (
          <div className="max-w-6xl mx-auto px-4 mt-32">
            <SearchCardSkeleton />
            <SearchCardSkeleton />
          </div>
        ) : error ? (
          <p className="text-center mt-20 text-red-500">Error: {error}</p>
        ) : (
          <PlaceDetail place={selectedPlace} />
        )}
      </main>

      <Footer />
    </>
  );
}