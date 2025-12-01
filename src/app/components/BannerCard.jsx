"use client";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SignInContent from "./SignInContent";

export default function BannerCard() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();
  const optionsDialog = useRef(null);
  const [isDialogSupported, setIsDialogSupported] = useState(true);

  const openOptions = () => {
    if (optionsDialog.current?.showModal) {
      optionsDialog.current.showModal();
    }
  };

  const handleStartTripClick = () => {
    if (!userInfo) {
      openOptions();
    } else {
      router.push("/trip-planning");
    }
  };

  useEffect(() => {
    // Check for native dialog support
    if (typeof HTMLDialogElement === "undefined") {
      setIsDialogSupported(false);
    }
  }, []);

  return (
    <>
      <section className="flex justify-center mt-16 px-4">
        <div className="relative w-full max-w-6xl rounded-2xl overflow-hidden shadow-md h-[400px] sm:h-[500px] md:h-[620px]">
          <img
            src="/images/Banner.png"
            alt="Hotel Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-12">
            <button
              onClick={handleStartTripClick}
              className="flex items-center gap-2 bg-white text-black text-sm sm:text-base font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              <img
                src="/images/ai-icon.svg"
                alt="AI Logo"
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
              <span className="flex items-center gap-1">
                Start a trip with AI
                <span className="text-[10px] sm:text-xs bg-black text-white px-2 py-[2px] rounded-full font-medium">
                  Beta
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Login Dialog with SignInContent */}
      {isDialogSupported && (
        <dialog
          ref={optionsDialog}
          className="backdrop:bg-black/40 border-none p-0 rounded-xl max-w-md w-[90%]"
        >
          <div className="flex flex-col items-center justify-center min-h-[100%]">
            <SignInContent onClose={() => optionsDialog.current?.close()} onEmailClick={() => {}} />
          </div>
        </dialog>
      )}
    </>
  );
}