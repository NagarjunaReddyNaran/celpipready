import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "CelpipReady — AI-Powered CELPIP Test Prep", template: "%s | CelpipReady" },
  description: "Score higher on CELPIP with AI-powered writing and speaking feedback. Free to start.",
  keywords: ["CELPIP practice test free", "CELPIP writing practice online", "CELPIP speaking practice with AI feedback"]
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar user={session?.user ?? null} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
