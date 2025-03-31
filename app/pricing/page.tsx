"use client"

import dynamic from "next/dynamic"
import { BreadcrumbSchema, ServiceSchema } from "@/components/SchemaOrg"
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Tarifs | Votre CV à partir de 1 500 FCFA",
  description: "À partir de seulement 1 500 FCFA, obtenez votre CV ou votre lettre de motivation. Des offres adaptées aux étudiants et aux professionnels pour maximiser vos opportunités."
};


const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: false })

const page = () => {
  // Breadcrumb data for schema
  const breadcrumbItems = [
    { name: "Accueil", url: "https://lexpertpro.com/" },
    { name: "Tarifs", url: "https://lexpertpro.com/pricing" },
  ]

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema />
      <Pricing />
    </>
  )
}

export default page

