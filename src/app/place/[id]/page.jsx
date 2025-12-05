// app/place/[id]/page.jsx
import dynamic from "next/dynamic";

// Dynamically import the real component
const PlaceIndex = dynamic(() => import("./index"));

// Re-export generation helpers
// export { generateStaticParams } from "./index";

// Metadata (optional)
export const metadata = {
  title: "Place Details | DilliHues",
  description: "Explore beautiful places in Delhi with detailed insights",
};

// ✅ Pass `params` to the imported component
export default function Page({ params }) {
  return <PlaceIndex params={params} />;
}