"use client"

import dynamic from "next/dynamic"
import { BreadcrumbSchema } from "@/components/SchemaOrg"
import { Metadata } from "next"

export const metadata:Metadata = {
  title: "À propos de L'Expert | Rédacteur de CV professionnels",
  description: "L'Expert vous accompagne vers l'emploi idéal avec des CV et lettres de motivation sur mesure. Service rapide, résultats garantis et livraison en 24h."
}

const About = dynamic(() => import("@/components/About"), { ssr: false })

const page = () => {
  // Breadcrumb data for schema
  const breadcrumbItems = [
    { name: "Accueil", url: "https://lexpertpro.com/" },
    { name: "À propos", url: "https://lexpertpro.com/about" },
  ]

  return (
    <div>
      <BreadcrumbSchema items={breadcrumbItems} />
      <About />
    </div>
  )
}

export default page

