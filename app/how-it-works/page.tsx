"use client"

import dynamic from "next/dynamic"
import { BreadcrumbSchema } from "@/components/SchemaOrg"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comment Ça Marche | Votre CV en moins de 24h",
  description: "Découvrez comment L'Expert vous accompagne pas à pas pour créer un CV percutant, une lettre de motivation convaincante et décrocher l'emploi de vos rêves."
};


const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: false })

const page = () => {
  // Breadcrumb data for schema
  const breadcrumbItems = [
    { name: "Accueil", url: "https://lexpertpro.com/" },
    { name: "Comment Ça Marche", url: "https://lexpertpro.com/how-it-works" },
  ]

  return (
    <div>
      <BreadcrumbSchema items={breadcrumbItems} />
      <HowItWorks />
    </div>
  )
}

export default page

