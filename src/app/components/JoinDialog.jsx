"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signUp } from "../../../redux/slices/userSlice";
import { toast } from 'sonner';



export default function JoinDialog({ onClose, onLoginClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    gender: "",
    travelling_since: "",
  });

  const dispatch = useDispatch();
const { loading, error, successMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
  dispatch(signUp(form))
    .unwrap()
    .then(() => {
      toast.success("🎉 Registration successful!");
      onClose(); // Close dialog on success
    })
    .catch((err) => {
      toast.error(err || "Something went wrong");
    });
};



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

      <h2 className="text-2xl font-bold mb-6 text-center">
        Join to unlock the best of DilliHues
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-2 mb-4 outline-none focus:ring-2 focus:ring-orange-500"
      />

      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-2.5 right-3 text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

     <div className="relative mb-4">
  <select
    name="gender"
    value={form.gender}
    onChange={handleChange}
    className="w-full border rounded-lg px-4 py-2 pr-10 outline-none focus:ring-2 focus:ring-orange-500 appearance-none text-gray-700"
  >
    <option value="" disabled className="text-gray-400">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>

  {/* Custom Dropdown Arrow */}
  <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
    ▼
  </div>
</div>


      <input
        type="number"
        name="travelling_since"
        placeholder="Years you've been traveling in Delhi (e.g. 2)"
        value={form.travelling_since}
        onChange={handleChange}
        min={0}
        max={100}
        className="w-full border rounded-lg px-4 py-2 mb-6 outline-none focus:ring-2 focus:ring-orange-500"
      />

      <button
        className="w-full bg-black text-white py-3 rounded-full font-semibold hover:bg-gray-900 transition"
        onClick={handleSubmit}
      >
        Join
      </button>

      <div className="mt-6 text-center text-sm">
        Already a member?{" "}
        <button
          onClick={onLoginClick}
          className="font-semibold underline hover:text-black"
        >
          Log in
        </button>{" "}
        using your DilliHues account.
      </div>

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