"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddPlaceBanner() {
  const router = useRouter();
  return (
    <section className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] bg-gray-100 overflow-hidden rounded-xl my-8">
  {/* Image Layer */}
  <Image
    src="/images/AddPlace.png"
    alt="Add Place Banner"
    fill
    className="object-cover"
    priority
  />

  {/* Optional overlay for contrast */}
  <div className="absolute inset-0 bg-black/30 z-0" />

  {/* Text Content */}
  <div className="absolute inset-0 flex flex-col justify-start sm:justify-center px-4 sm:px-6 md:px-16 pt-14 sm:pt-16 md:pt-0 z-10">
    <div className="text-left text-white max-w-xl">
      <h1 className="text-lg sm:text-2xl md:text-5xl font-extrabold mb-2 sm:mb-4 leading-snug drop-shadow-md">
        Share Your Favorite Spot in Delhi
      </h1>
      <p className="text-xs sm:text-base md:text-lg mb-4 sm:mb-6 font-medium drop-shadow-sm">
        Add your recommended cafes, hidden gems, or iconic <br />
        landmarks and help others discover the city better.
      </p>
      <button
        onClick={() => router.push("/addplace")}
        className="bg-white hover:bg-gray-100 text-black font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md transition"
      >
        Add a Place Now
      </button>
    </div>
  </div>
</section>



  );
}