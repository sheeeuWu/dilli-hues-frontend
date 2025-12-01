"use client";

import StaticHeader from "../components/StaticHeader";
import Footer from "../components/Footer";
import SearchComponent from "./SearchComponent";

export default function SearchResultsPage() {
  return (
    <>
      <StaticHeader />
      <SearchComponent />
      <Footer />
    </>
  );
}