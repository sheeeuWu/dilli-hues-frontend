"use client";
import Image from "next/image";
import { useState } from "react";

export default function ForgotPasswordDialog({ onClose }) {
  const [email, setEmail] = useState("");

  return (
    <div className="relative bg-white rounded-xl p-6 w-full max-w-md">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-black"
        aria-label="Close"
      >
        &times;
      </button>

      <div className="flex justify-center mb-6">
        <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
      </div>

      <h2 className="text-2xl font-bold mb-3 text-center">Forgot your password?</h2>
      <p className="text-center text-gray-600 text-sm mb-6">
        No problem. Just enter your email address below — we’ll send you a link to reset it.
      </p>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-6 outline-none focus:ring-2 focus:ring-orange-500"
      />

      <button className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition">
        Send link
      </button>

      <p className="mt-6 text-xs text-gray-500 text-center leading-5">
        This site is protected by reCAPTCHA and the Google{" "}
        <a href="#" className="underline">Privacy Policy</a> and{" "}
        <a href="#" className="underline">Terms of Service</a> apply.
      </p>
    </div>
  );
}