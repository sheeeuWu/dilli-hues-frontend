import dynamic from "next/dynamic";

// Lazy load the stepper logic for adding a place
const AboutUsPage = dynamic(() => import("./index"));

// SEO metadata
export const metadata = {
  title: "About Us | DilliHues",
  description: "Know more about us",
};

export default function Page() {
  return <AboutUsPage />;
}