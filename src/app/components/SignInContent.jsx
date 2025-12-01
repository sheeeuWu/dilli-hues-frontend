// components/SignInContent.jsx
"use client";
import { FaGoogle, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

export default function SignInContent({ onClose, onEmailClick }) {
  return (
    <div className="p-6 w-full max-w-md bg-white rounded-xl shadow-xl relative">
      <button onClick={onClose} className="absolute top-3 right-4 text-xl font-bold">
        &times;
      </button>

      <div className="flex justify-center mb-6">
        <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
      </div>

      <h2 className="text-xl font-bold text-center mb-4">
        Sign in to unlock the best of DilliHues.
      </h2>

      <div className="space-y-3">
        {/* <button className="w-full flex items-center justify-center gap-2 border rounded-full px-4 py-3 font-medium hover:bg-gray-100">
          <FaGoogle />
          Continue with Google
        </button> */}
        <button onClick={onEmailClick} className="w-full flex items-center justify-center gap-2 border rounded-full px-4 py-3 font-medium hover:bg-gray-100">
          <FaEnvelope />
          Continue with email
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-6 text-center">
        By continuing, you agree to our <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.
      </p>
    </div>
  );
}