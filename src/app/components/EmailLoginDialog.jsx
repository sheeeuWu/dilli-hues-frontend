"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signIn } from "../../../redux/slices/userSlice"
import { toast } from "sonner";

export default function EmailLoginDialog({ onClose, onForgotClick, onJoinClick }) {
    const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
    email: "",
    password: "",
  });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    dispatch(signIn(form))
      .unwrap()
      .then((res) => {
        toast.success("🎉 Logged in successfully!");
        onClose(); // Close the modal
      })
      .catch((err) => {
        toast.error(err || "Login failed. Check your credentials.");
      });
  };


  return (
    <div className="relative bg-white rounded-xl p-6 w-full max-w-md">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-black"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome back.</h2>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Email address</label>
        <input
          type="email"
          name="email"
             value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Password Field */}
      <div className="mb-2 relative">
        <label className="block text-sm font-semibold mb-1">Password</label>
        <input
           name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="button"
          className="absolute top-9 right-3 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {/* Forgot Password */}
      <div  className="mb-6 text-right">
      <button onClick={onForgotClick} className="text-sm text-blue-600 underline hover:text-blue-800">
          Forgot password?
        </button>
      </div>

      {/* Sign in Button */}
      <button className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition"
        onClick={handleLogin}>
        Sign in
      </button>

      {/* Divider */}
      <hr className="my-6" />

      {/* Sign up */}
      <div className="text-center text-sm text-gray-700">
        Not a member?{" "}
        <button onClick={onJoinClick} className="font-semibold underline hover:text-black">
          Join
        </button>{" "}
        to unlock the best of DilliHues.
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-gray-500 text-center leading-5">
        By proceeding, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Use
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}