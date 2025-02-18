import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import { Analytics } from "@vercel/analytics/react";
import DynamicNavbar from "@/components/DynamicNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "L'Expert - CV et lettres de motivation personnalisés en 24h",
  description:
    "Service de rédaction professionnelle de CV et lettres de motivation, livrés en moins de 24 heures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <DynamicNavbar />
        <div className="pt-16">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
