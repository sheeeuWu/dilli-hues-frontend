import Image from "next/image";

export default function PlaceDetail({ place }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Image */}
      <div className="rounded-2xl overflow-hidden shadow-md mb-6">
        <Image
          src={place.image}
          alt={place.name}
          width={1200}
          height={500}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Details */}
      <h1 className="text-3xl font-extrabold mb-2">{place.name}</h1>
      <p className="text-sm text-gray-600 mb-4">{place.locality}</p>
      <p className="text-base text-gray-700 mb-6">{place.description}</p>

      {/* Google Maps Embed */}
      <div className="w-full h-[300px] rounded-xl overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}&z=15&output=embed`}
        />
      </div>
    </div>
  );
}