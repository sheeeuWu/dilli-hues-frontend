"use client";
import StaticHeader from "../components/StaticHeader";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchLikedPlaces } from "../../../redux/slices/likedPlacesSlice";
import { useDispatch, useSelector } from "react-redux";

export default function LikedPlacesPage() {
  // const [likedPlaces] = useState([]); // Placeholder until API is added
  const dispatch = useDispatch();
  const { likedPlaces, loading } = useSelector((state) => state.likedPlaces);

  useEffect(() => {
    dispatch(fetchLikedPlaces());
  }, [dispatch]);

  return (
    <>
      <StaticHeader />

      <div className="max-w-4xl mx-auto px-4 mt-20 py-12">
        <h1 className="text-3xl font-bold mb-4">Your Liked Places</h1>
        <p className="text-gray-600 mb-8">
          These are the places you've shown love to. Discover them again or plan
          a visit!
        </p>

        {loading && (
          <p className="text-center text-gray-500 py-20">Loading...</p>
        )}

        {!loading && likedPlaces.length === 0 ? (
          <div className="text-center py-20">
            {/* <Image
              src="/images/empty-likes.png"
              alt="No Liked Places"
              width={180}
              height={180}
              className="mx-auto mb-6 opacity-70"
            /> */}
            <p className="text-lg font-medium text-gray-700">
              You haven’t liked any places yet.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Start exploring and tap the ❤️ icon to save spots you love!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {likedPlaces.map(({ id, place }) => (
              <div
                key={id}
                className="border rounded-lg shadow overflow-hidden"
              >
                <Image
                  src={place.image || "/images/default.jpg"}
                  alt={place.name}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl font-semibold">{place.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {place.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
