import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react"
import { Analytics } from "@vercel/analytics/react"
import DynamicNavbar from "@/components/DynamicNavbar"
import DynamicWhatsAppButton from "@/components/DynamicWhatsAppButton"
import Script from "next/script"
import GTMScript from "@/components/GTMScript"
import Footer from "@/components/Footer"
import { WebsiteSchema, OrganizationSchema } from "@/components/SchemaOrg"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "L'Expert - CV et lettres de motivation personnalisés en 24h",
  description: "Service de rédaction professionnelle de CV et lettres de motivation, livrés en moins de 24 heures",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-0NBGYEYQ67" />
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
        {/* Schema.org structured data */}
        <WebsiteSchema />
        <OrganizationSchema />

        <GTMScript />
        <DynamicNavbar />
        <div className="pt-16">{children}</div>
        <Footer />
        <DynamicWhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}

