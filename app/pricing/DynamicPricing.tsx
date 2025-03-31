"use client"

import { BreadcrumbSchema, ServiceSchema } from "@/components/SchemaOrg"
import dynamic from "next/dynamic"

const Pricing = dynamic(() => import("@/components/Pricing"), { ssr: false })

const DynamicPricing = () => {
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

export default DynamicPricing