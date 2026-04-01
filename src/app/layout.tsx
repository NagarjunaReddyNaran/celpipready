import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "CelpipEdge — AI-Powered CELPIP Test Prep", template: "%s | CelpipEdge" },
  description: "Score higher on CELPIP with AI-powered writing and speaking feedback. Free to start.",
  keywords: ["CELPIP practice test free", "CELPIP writing practice online", "CELPIP speaking practice with AI feedback"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
