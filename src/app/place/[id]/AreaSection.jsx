"use client";
import Image from "next/image";
import Link from "next/link";

export default function AreaSection({ googleMapUrl, nearbyCafes = [], otherNearby = [], location = "" }) {
   let embedSrc = "";
  if (googleMapUrl?.includes("query=")) {
    const coords = googleMapUrl.split("query=")[1]; // "28.516134,77.185771"
    embedSrc = `https://maps.google.com/maps?q=${coords}&z=15&output=embed`;
  } else {
    embedSrc = googleMapUrl;
  }
  return (
    <div className="mt-16 px-4 lg:px-10 max-w-7xl mx-auto">
      <h2 className="text-xl font-bold mb-2">📍 The Area</h2>
      <p className="mb-1 font-medium">{location}</p>
      {/* <p className="mb-4 text-sm text-gray-600">Neighbourhood: Mehrauli</p> */}

      {/* <div className="flex gap-4 mb-6 text-sm font-medium">
        <a href="#" className="text-blue-600 hover:underline">Visit website</a>
        <a href="#" className="text-blue-600 hover:underline">Call</a>
        <a href="#" className="text-blue-600 hover:underline">Email</a>
      </div> */}

      {/* MAP SECTION */}
      <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md border mb-10">
        {embedSrc ? (
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            className="border-0"
            src={embedSrc}
          />
        ) : (
          <div className="text-sm text-gray-500 text-center py-6">
            Location map is not available.
          </div>
        )}
      </div>

       <h3 className="text-lg font-semibold mb-4">✨ Best Nearby</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

        {/* Nearby Cafes */}
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">🍽️ Cafes</p>
          {nearbyCafes.length > 0 ? (
            nearbyCafes.map((cafe) => (
              <Link href={`/place/${cafe.id}`} key={cafe.id} className="flex items-start gap-3 mb-4 hover:bg-gray-50 p-2 rounded-lg transition">
                <Image
                  src={cafe.images?.[0] || "/images/placeholder.png"}
                  alt={cafe.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover aspect-square"
                />
                <div>
                  <p className="font-semibold">{cafe.name}</p>
                  <p className="text-green-700 text-sm font-medium">Budget: {cafe.budget_per_head}</p>
                  <p className="text-blue-700 text-sm">Best time to visit: {cafe.best_time_to_visit}</p>
                  <p className="text-sm text-gray-600">{cafe.tags?.join(", ")}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No nearby cafes found.</p>
          )}
        </div>

        {/* Nearby Attractions */}
        <div>
          <p className="text-sm text-gray-600 mb-2 font-medium">📸 Attractions</p>
          {otherNearby.length > 0 ? (
            otherNearby.map((place) => (
              <Link href={`/place/${place.id}`} key={place.id} className="flex items-start gap-3 mb-4 hover:bg-gray-50 p-2 rounded-lg transition">
                <Image
                  src={place.images?.[0] || "/images/placeholder.png"}
                  alt={place.name}
                  width={60}
                  height={60}
                  className="rounded-md object-cover aspect-square"
                />
                <div>
                  <p className="font-semibold">{place.name}</p>
                  <p className="text-green-700 text-sm font-medium">Budget: {place.budget_per_head}</p>
                  <p className="text-blue-700 text-sm">Best time to visit: {place.best_time_to_visit}</p>
                  <p className="text-sm text-gray-600">{place.tags?.join(", ")}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No nearby attractions found.</p>
          )}
        </div>
      </div>
    </div>
  );
}