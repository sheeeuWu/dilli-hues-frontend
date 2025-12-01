"use client";
import { useState } from "react";
import StaticHeader from "../components/StaticHeader";
import Footer from "../components/Footer";

export default function ProfileSettings() {
  const [name, setName] = useState("Jane Doe");
  const [email, setEmail] = useState("jane@example.com");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  return (
    <>
      <StaticHeader />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
        <p className="text-gray-600 mb-6 mt-20">
          Update your personal information below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm border rounded-xl p-6 space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md text-sm shadow-sm focus:ring-orange-500 focus:border-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-orange-600 text-white px-5 py-2 text-sm font-medium rounded-md hover:bg-orange-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}