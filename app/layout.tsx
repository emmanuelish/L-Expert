import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import { Analytics } from "@vercel/analytics/react";
import DynamicNavbar from "@/components/DynamicNavbar";
import DynamicWhatsAppButton from "@/components/DynamicWhatsAppButton";
import Script from "next/script";
import GTMScript from "@/components/GTMScript";
import Footer from "@/components/Footer";
import { WebsiteSchema, OrganizationSchema } from "@/components/SchemaOrg";
import { AuthContextProvider } from "@/context/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "L'Expert - CV et lettres de motivation personnalisés en 24h",
  description:
    "En moins de 24h, L'Expert vous offre un CV et une lettre de motivation sur mesure, rédigés par des professionnels pour booster votre carrière. ",
  viewport: {
    width: "device-width",
    initialScale: 1.0,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    charset: "UTF-8",
  },
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
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
          }}
        />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-0NBGYEYQ67"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', 'G-0NBGYEYQ67', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          {/* Schema.org structured data */}
          <WebsiteSchema />
          <OrganizationSchema />

          <GTMScript />
          <DynamicNavbar />
          <div className="pt-16">{children}</div>
          <Footer />
          <DynamicWhatsAppButton />
          <Analytics />
        </AuthContextProvider>
      </body>
    </html>
  );
}
