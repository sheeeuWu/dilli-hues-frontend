import dynamic from "next/dynamic";

// Lazy load the search results page component
const SearchResultsPage = dynamic(() => import("./index"));

// Optional metadata (SEO, title, etc.)
export const metadata = {
  title: "Search Results | DilliHues",
  description: "Discover places in Delhi that match your vibe and mood.",
};

export default function Page() {
  return <SearchResultsPage />;
}