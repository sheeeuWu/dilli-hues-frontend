import "./globals.css";
import { Poppins, Roboto_Mono } from "next/font/google";
import Providers from "./components/Provider"; // ✅ Correct import path
import { Analytics } from "@vercel/analytics/next"


const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const robotoMono = Roboto_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${robotoMono.variable}`}>
      <Providers>{children}</Providers>
      <Analytics />
      </body>
    </html>
  );
}