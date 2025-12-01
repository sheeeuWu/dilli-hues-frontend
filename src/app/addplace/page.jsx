import dynamic from "next/dynamic";

// Lazy load the stepper logic for adding a place
const AddPlacePage = dynamic(() => import("./index"));

// SEO metadata
export const metadata = {
  title: "Add a Place | DilliHues",
  description: "Submit a new place with details, timings, and more on DilliHues",
};

export default function Page() {
  return <AddPlacePage />;
}