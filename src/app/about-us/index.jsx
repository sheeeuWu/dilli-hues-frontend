"use client";
import { useState } from "react";
import StaticHeader from "../../app/components/StaticHeader";
import Footer from "../../app/components/Footer";
import AboutUsContent from "./Content";

export default function AddPlacePage() {

  return (
    <>
      <StaticHeader />
      <AboutUsContent />
      <Footer />
    </>
  );
}
