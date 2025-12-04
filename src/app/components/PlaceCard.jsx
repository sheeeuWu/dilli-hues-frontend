"use client";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import Image from "next/image";
import { likePlace, unlikePlace } from "../../../redux/slices/likedPlacesSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatImageUrl } from "../../../utils/formatImageUrl";


export default function PlaceCard({ place }) {
    const dispatch = useDispatch();
  const likedPlaces = useSelector((state) => state.likedPlaces.likedPlaces);

  const isLiked = likedPlaces?.some((p) => p.place_id === place.id);

  const [wishlisted, setWishlisted] = useState(isLiked);

  useEffect(() => {
    setWishlisted(isLiked);
  }, [isLiked]);

  const handleToggleLike = (e) => {
    e.preventDefault(); // prevent Link click
    if (wishlisted) {
      dispatch(unlikePlace(place.id));
    } else {
      dispatch(likePlace(place.id));
    }
  };

    const imageUrl = place.image || "/images/placeholder.png";


  return (
    <Link href={`/place/${place.id}`} className="block">
      <div className="relative w-64 flex-shrink-0 rounded-xl overflow-hidden shadow mb-2 hover:shadow-md transition">
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
             src={imageUrl}
            alt={place.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
          {/* Wishlist Icon */}
          <button
              onClick={handleToggleLike}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
          >
            {wishlisted ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-2 bg-white rounded-b-xl">
          <h3 className="font-semibold text-sm mb-1">{place.title}</h3>
          <div className="flex items-center text-sm text-gray-700 mb-1">
            <span className="font-semibold text-orange-600 mr-1 truncate w-full">
              {place.location}
            </span>
            {/* <span>•</span>
            <span className="ml-1 text-gray-500">({place.reviews})</span> */}
          </div>
          <p className="text-xs text-gray-500">{place.subtitle}</p>
        </div>
      </div>
    </Link>
  );
}