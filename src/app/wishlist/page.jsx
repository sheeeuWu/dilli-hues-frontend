import dynamic from "next/dynamic";

const WishlistPage = dynamic(() => import("./index"));

export const metadata = {
  title: "Your Wishlist | DilliHues",
  description: "Browse your favorite saved places on DilliHues.",
};

export default function Page() {
  return <WishlistPage />;
}