"use client";
import Image from "next/image";
import { FiCompass, FiSmile, FiShield, FiMap } from "react-icons/fi";

export default function AboutUsContent() {
  return (
    <div className="text-black">
      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto text-center px-6 pt-20 pb-5">
        <h1 className="text-4xl font-bold mb-4 mt-5">About DilliHues</h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          DilliHues is your AI-powered travel companion—built to help you
          explore cities not just by places, but by{" "}
          <strong>moods, vibes, and personal experiences</strong>.
        </p>
      </section>

      {/* MISSION SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-10 gap-10 items-center">
        <div className="md:col-span-6">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            We want to make travel{" "}
            <strong>simpler, safer, and more personal</strong>. No more endless
            blogs, rigid search filters, or guesswork. Just tell us your
            mood—calm, adventurous, romantic, cultural— and our AI curates the
            spots that truly match your vibe.
          </p>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Whether you're exploring alone or with friends, we help you wander
            confidently with <strong>gender-aware safety insights</strong> and
            smart, hyper-local recommendations.
          </p>
        </div>

        <div className="md:col-span-4 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/about-hero.jpg"
            alt="Discovering new places"
            width={600}
            height={400}
            className="object-cover"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">
            What We Bring to Your Journey
          </h2>

          <div className="grid md:grid-cols-4 gap-10 text-center">
            <div className="p-6 bg-white shadow-md rounded-xl">
              <FiSmile className="text-orange-600 text-4xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Mood-Based Explore</h3>
              <p className="text-gray-600 text-sm">
                Share how you feel—calm, adventurous, romantic—and get curated
                spots instantly.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-xl">
              <FiMap className="text-orange-600 text-4xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Smart Itineraries</h3>
              <p className="text-gray-600 text-sm">
                Generate personalized day plans based on your preferences,
                timings, and interests.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-xl">
              <FiShield className="text-orange-600 text-4xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Safety Insights</h3>
              <p className="text-gray-600 text-sm">
                Gender-aware safety markers and live indicators so you travel
                with confidence.
              </p>
            </div>

            <div className="p-6 bg-white shadow-md rounded-xl">
              <FiCompass className="text-orange-600 text-4xl mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Local Vibes</h3>
              <p className="text-gray-600 text-sm">
                Discover places based on culture, community vibes, and hidden
                gems loved by locals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-10 gap-10 items-center">
          <div className="md:col-span-4 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/about-team.jpg"
              width={600}
              height={400}
              alt="DilliHues Team"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-6">
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              DilliHues started with a simple realization—
              <strong>travel is emotional</strong>, not mechanical. Search bars
              don’t understand moods. Ratings don’t explain experiences. And
              generic guides don’t match the way you feel.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              So we built an AI that listens to your vibe, adapts to your
              preferences, and guides you like a friend who knows the city
              inside out.
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              This is travel—<strong>, thoughtful, and human</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="bg-orange-50 text-black px-6 py-10 rounded-xl my-12 shadow-md w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold ">
            Ready to Explore the City?
          </h2>
          <p className="text-md md:text-lg max-w-2xl font-medium text-gray-700">
            Let DilliHues craft your next mood-based journey.
          </p>
          <a
            href="/trip-planning"
            className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Start Exploring
          </a>
        </div>
      </section> */}

      <section className="bg-orange-600 text-white px-6 py-10 rounded-xl my-12 shadow-md w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold ">
            Ready to Explore the City?
          </h2>
          <p className="text-md md:text-lg max-w-2xl font-medium text-white">
            Let DilliHues craft your next mood-based journey.
          </p>
          <a
            href="/trip-planning"
            className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Start Exploring
          </a>
        </div>
      </section>
    </div>
  );
}
