import Image from "next/image";
import Navbar from "./components/Navbar";
import HeroSearchSection from "./components/HeroSearchSection";
import BannerCard from "./components/BannerCard";
import RecommendedPlaces from "./components/RecommendedPlaces";
import AddPlaceBanner from "./components/AddPlaceBanner";
import Footer from "./components/Footer";
import LeaderboardTeaser from "./components/LeaderboardTeaser";
import StickyHeader from "./components/StickyNavbar";
import CategoryGrid from "./components/CategoryGrid";

export default function Home() {
  return (
    <>
    <Navbar />
    <StickyHeader />
    <HeroSearchSection />
    <BannerCard />
    <CategoryGrid />
    <RecommendedPlaces  />
    <AddPlaceBanner />
    <LeaderboardTeaser />
    <Footer />
    </>
  );
}