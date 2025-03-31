"use client"

import dynamic from "next/dynamic"
import { BreadcrumbSchema, ServiceSchema } from "@/components/SchemaOrg"
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Nos Services de rédaction de CV et lettre de motivation",
  description: "Découvrez nos services professionnels pour optimiser votre CV, rédiger une lettre de motivation percutante et maximiser vos chances d'emploi."
};


const Features = dynamic(() => import("@/components/Features"), { ssr: false })
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: false })

const page = () => {
  // Breadcrumb data for schema
  const breadcrumbItems = [
    { name: "Accueil", url: "https://lexpertpro.com/" },
    { name: "Nos Services", url: "https://lexpertpro.com/services" },
  ]

  return (
    <div>
      <BreadcrumbSchema items={breadcrumbItems} />
      <ServiceSchema />
      <Features />
      <Testimonials />
    </div>
  )
}

export default page

