import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Nano Banana | Future of Freshness",
  description:
    "Experience the pinnacle of cold-pressed purity. 100% fruit, never heated, HPP treated for raw living nutrients.",
  keywords: ["cold pressed juice", "nano banana", "raw juice", "artisan drinks"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased min-h-screen text-white font-sans selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
