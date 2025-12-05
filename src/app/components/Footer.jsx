"use client";
import { FaInstagram, FaFacebookF, FaXTwitter, FaYoutube, FaPinterest } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-sm text-gray-700 pt-10 pb-6 px-4 mt-12">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 - About */}
        <div>
          <h4 className="font-bold mb-3 text-black">About DilliHues</h4>
          <ul className="space-y-2">
            <li><a href="/about-us">About Us</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 2 - Explore */}
        <div>
          <h4 className="font-bold mb-3 text-black">Explore</h4>
          <ul className="space-y-2">
            <li><a href="#">Add a Place</a></li>
            <li><a href="#">Write a Review</a></li>
            <li><a href="#">Top Picks</a></li>
            <li><a href="#">Hidden Gems</a></li>
          </ul>
        </div>

        {/* Column 3 - Partners */}
        <div>
          <h4 className="font-bold mb-3 text-black">For Partners</h4>
          <ul className="space-y-2">
            <li><a href="#">Promote Your Spot</a></li>
            <li><a href="#">Add Business</a></li>
            <li><a href="#">Advertise</a></li>
          </ul>
        </div>

        {/* Column 4 - App + Country */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-black font-semibold mb-1">Currency</label>
            <select className="w-full px-3 py-2 border rounded">
              <option>₹ INR</option>
              <option>$ USD</option>
            </select>
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">City</label>
            <select className="w-full px-3 py-2 border rounded">
              <option>Delhi</option>
              {/* <option>United States</option> */}
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-5xl mx-auto mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500 text-center md:text-left">
          © {new Date().getFullYear()} DailyHues. All rights reserved.
        </p>
        <div className="flex gap-4 text-lg text-gray-700">
          <FaFacebookF className="hover:text-black cursor-pointer" />
          <FaXTwitter className="hover:text-black cursor-pointer" />
          <FaInstagram className="hover:text-black cursor-pointer" />
          <FaYoutube className="hover:text-black cursor-pointer" />
          <FaPinterest className="hover:text-black cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}