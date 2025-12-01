"use client";

import StaticHeader from "../components/StaticHeader";
import Footer from "../components/Footer";
import SearchComponent from "./Category";

export default function SearchResultsPage() {
  return (
    <>
      <StaticHeader />
      <SearchComponent />
      <Footer />
    </>
  );
}