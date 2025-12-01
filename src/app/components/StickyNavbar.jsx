"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaBars, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropdown";
import SignInContent from "./SignInContent";
import EmailLoginDialog from "./EmailLoginDialog";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import JoinDialog from "./JoinDialog";
import Link from "next/link";

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);

  // Dialog refs
  const optionsDialog = useRef(null);
  const emailDialog = useRef(null);
  const forgotDialog = useRef(null);
  const joinDialog = useRef(null);

  // Dialog control functions
  const openOptions = () => optionsDialog.current?.showModal();
  const closeOptions = () => optionsDialog.current?.close();
  const closeEmail = () => emailDialog.current?.close();
  const openForgot = () => forgotDialog.current?.showModal();
  const closeForgot = () => forgotDialog.current?.close();
  const openJoin = () => joinDialog.current?.showModal();
  const closeJoin = () => joinDialog.current?.close();

  const handleEmailClick = () => {
    closeOptions();
    emailDialog.current?.showModal();
  };

  // Sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 gap-2">

          {/* Left */}
          <div className="flex items-center gap-3">
            {/* Hamburger - visible only on mobile */}
            <button className="block md:hidden" onClick={() => setMobileNavOpen(true)}>
              <FaBars className="w-5 h-5 text-black" />
            </button>

            {/* Logo - only on md+ */}
            <div className="hidden md:flex items-center gap-2">
              <div className="relative w-[46px] h-[46px]">
                <Image src="/images/logo.png" alt="DilliHues" fill className="object-contain" />
              </div>
              <span className="text-2xl md:text-3xl font-extrabold text-black">DilliHues</span>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 min-w-0 w-full sm:max-w-md flex items-center bg-white rounded-full border border-gray-300 px-3 sm:px-4 py-2 shadow-sm mx-0 sm:mx-4">

            <FaSearch className="text-gray-400 mr-2" size={16} />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 text-sm md:text-base outline-none bg-transparent placeholder-gray-500"
            />
          </div>

          {/* Right - Links & Sign In/User */}
         <div className="flex-shrink-0 flex items-center gap-4">
            {/* Links on md+ */}
            <div className="hidden md:flex gap-6 text-sm font-semibold text-black">
              {["Start a Trip", "Contribute", "About Us"].map((label) => {
            const customRoutes = {
              "Start a Trip": "/trip-planning",
              "Contribute": "/addplace",
            };

            const href = customRoutes[label] || `/${label.toLowerCase().replace(/\s+/g, '-')}`;

              const handleProtectedNav = (e) => {
    if (!userInfo && (label === "Start a Trip" || label === "Contribute")) {
      e.preventDefault();
      openOptions();
    }
  };


            return (
              <a
                key={label}
                href={href}
                   onClick={handleProtectedNav}
                className="relative group pb-1"
              >
                {label}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            );
          })}
            </div>

            {/* Sign in or User dropdown */}
            {userInfo ? (
              <UserDropdown />
            ) : (
              <button
                onClick={openOptions}
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition whitespace-nowrap"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-none"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="fixed top-0 left-0 w-3/5 h-full bg-white z-50 shadow-lg flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="relative w-[32px] h-[32px]">
                  <Image src="/images/logo.png" alt="DilliHues Logo" fill className="object-contain" />
                </div>
                <span className="text-lg font-bold">DilliHues</span>
              </div>
              <button onClick={() => setMobileNavOpen(false)} className="text-2xl font-bold">
                &times;
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-base font-medium">
              <Link href="/trip-planning" onClick={(e) => {
    if (!userInfo) {
      e.preventDefault();
      setMobileNavOpen(false);
      openOptions();
    } else {
      setMobileNavOpen(false);
    }
  }}>Start a Trip</Link>
              <Link href="/addplace"  onClick={(e) => {
    if (!userInfo) {
      e.preventDefault();
      setMobileNavOpen(false);
      openOptions();
    } else {
      setMobileNavOpen(false);
    }
  }}>Contribute</Link>
              <Link href="/about-us"  onClick={(e) => {
    if (!userInfo) {
      e.preventDefault();
      setMobileNavOpen(false);
      openOptions();
    } else {
      setMobileNavOpen(false);
    }
  }}>About Us</Link>

              {!userInfo && (
                <button
                  onClick={() => {
                    setMobileNavOpen(false);
                    openOptions();
                  }}
                  className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-full font-semibold hover:bg-orange-600 transition"
                >
                  Sign in
                </button>
              )}
            </nav>
          </div>
        </>
      )}

      {/* Dialogs */}
      <dialog
        ref={optionsDialog}
        className="backdrop:bg-black/40 border-none p-0 rounded-xl max-w-md w-[90%]"
      >
         <div className="flex flex-col items-center justify-center min-h-[100%]">
          <SignInContent onClose={closeOptions} onEmailClick={handleEmailClick} />
        </div>
      </dialog>

      <dialog
        ref={emailDialog}
        className="backdrop:bg-black/40 border-none p-0 rounded-xl max-w-md w-[90%]"
      >
         <div className="flex flex-col items-center justify-center min-h-[100%]">
          <EmailLoginDialog
            onClose={closeEmail}
            onForgotClick={() => {
              closeEmail();
              openForgot();
            }}
            onJoinClick={() => {
              closeEmail();
              openJoin();
            }}
          />
        </div>
      </dialog>

      <dialog
        ref={forgotDialog}
        className="backdrop:bg-black/40 border-none p-0 rounded-xl max-w-md w-[90%]"
      >
         <div className="flex flex-col items-center justify-center min-h-[100%]">
          <ForgotPasswordDialog onClose={closeForgot} />
        </div>
      </dialog>

      <dialog
        ref={joinDialog}
        className="backdrop:bg-black/40 border-none p-0 rounded-xl max-w-md w-[90%]"
      >
         <div className="flex flex-col items-center justify-center min-h-[100%]">
          <JoinDialog
            onClose={closeJoin}
            onLoginClick={() => {
              closeJoin();
              emailDialog.current?.showModal();
            }}
          />
        </div>
      </dialog>
    </>
  );
}