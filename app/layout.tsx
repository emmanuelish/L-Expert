import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import { Analytics } from "@vercel/analytics/react";
import DynamicNavbar from "@/components/DynamicNavbar";
import DynamicWhatsAppButton from "@/components/DynamicWhatsAppButton";
import Script from "next/script";

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
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-HRXPV17YNY`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.className} overflow-x-hidden`}>
        <DynamicNavbar />
        <div className="pt-16">{children}</div>
        <DynamicWhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}