"use client"

import dynamic from "next/dynamic"
import { BreadcrumbSchema, ServiceSchema } from "@/components/SchemaOrg"

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

