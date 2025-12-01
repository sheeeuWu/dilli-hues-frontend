"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/slices/userSlice";
import { toast } from "sonner";
import { FaUserCircle, FaChevronDown, FaSuitcaseRolling, FaPenFancy, FaHeart, FaUser, FaCog } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast("👋 Logged out successfully.");
  };

  if (!user) return null;

  return (
    <div className="relative z-50">
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-black px-4 py-2 font-medium"
      >
        <FaUserCircle className="w-6 h-6" />
        <FaChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Fullscreen Mobile Sidebar */}
          <div className="fixed inset-0 w-screen h-screen bg-white z-50 sm:hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <FaUserCircle className="w-8 h-8" />
                <span className="font-semibold">{user.first_name}</span>
              </div>
              <button onClick={() => setOpen(false)}>
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            <ul className="flex flex-col gap-1 px-4 py-4 text-gray-700 text-base">
              <li>
                <a href="/trip-planning" className="flex items-center gap-2 py-2 border-b">
                  <FaSuitcaseRolling className="w-4 h-4" />
                  Start a Trip
                </a>
              </li>
              <li>
                <a href="/contribute" className="flex items-center gap-2 py-2 border-b">
                  <FaPenFancy className="w-4 h-4" />
                  Contribute
                </a>
              </li>
              <li>
                <a href="/wishlist" className="flex items-center gap-2 py-2 border-b">
                  <FaHeart className="w-4 h-4" />
                  My Liked Places
                </a>
              </li>
              <li>
                <a href="/profile" className="flex items-center gap-2 py-2 border-b">
                  <FaUser className="w-4 h-4" />
                  My Profile
                </a>
              </li>
              <li>
                <a href="/settings" className="flex items-center gap-2 py-2 border-b">
                  <FaCog className="w-4 h-4" />
                  Settings
                </a>
              </li>
            </ul>

            <div className="px-4 mt-6">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white rounded-full py-2 font-semibold hover:bg-red-600 transition"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Desktop Dropdown */}
          <div className="hidden sm:absolute sm:right-0 sm:mt-2 sm:w-52 sm:bg-white sm:border sm:border-orange-200 sm:rounded-lg sm:shadow-lg sm:block">
            <ul className="py-2 text-sm text-gray-700">
              <li>
                <a href="/trip-planning" className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 transition">
                  <FaSuitcaseRolling className="w-4 h-4" />
                  Start a Trip
                </a>
              </li>
              <li>
                <a href="/contribute" className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 transition">
                  <FaPenFancy className="w-4 h-4" />
                  Contribute
                </a>
              </li>
              <li>
                <a href="/wishlist" className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 transition">
                  <FaHeart className="w-4 h-4" />
                  My Liked Places
                </a>
              </li>
              <li>
                <a href="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 transition">
                  <FaUser className="w-4 h-4" />
                  My Profile
                </a>
              </li>
              <li>
                <a href="/settings" className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 transition">
                  <FaCog className="w-4 h-4" />
                  Settings
                </a>
              </li>
              <li><hr className="my-1 border-orange-100" /></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}