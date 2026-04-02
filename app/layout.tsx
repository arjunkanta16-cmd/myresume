import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { PortfolioProvider } from "@/components/providers/portfolio-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "KANTA LEELA TRILOK ARJUN | IT Developer | DevOps Enthusiast | Systems Thinker",
  description:
    "Premium personal portfolio for Kanta Leela Trilok Arjun, highlighting engineering background, software development, DevOps interest, AI direction, and systems thinking.",
  openGraph: {
    title: "Kanta Leela Trilok Arjun Portfolio",
    description: "System-driven IT Engineer building scalable and intelligent solutions.",
    type: "website"
  }
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#fafaf8"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} bg-bg font-sans text-text antialiased`}
        style={{ colorScheme: "light" }}
      >
        <ThemeProvider>
          <PortfolioProvider>{children}</PortfolioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
