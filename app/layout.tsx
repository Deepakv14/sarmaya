import type { Metadata } from "next";
import { Geist, Geist_Mono, Mukta } from "next/font/google";
import "./globals.css";
import IntroLoader from "./loader/IntroLoader";

import { Comforter_Brush, Playfair_Display, Instrument_Serif, Klee_One} from "next/font/google";

const comforterBrush = Comforter_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-comforter-brush",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-playfair-display",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

const kleeOne = Klee_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-klee-one",
}); 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["devanagari", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "sarmaya",
  description: "created by Debugv14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${mukta.variable} ${comforterBrush.variable} ${playfairDisplay.variable} ${instrumentSerif.variable} ${kleeOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <IntroLoader>{children}</IntroLoader>
      </body>
    </html>
  );
}
