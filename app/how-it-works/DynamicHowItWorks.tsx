"use client"

import { BreadcrumbSchema } from "@/components/SchemaOrg"
import dynamic from "next/dynamic"

const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: false })

const DynamicHowItWorks = () => {
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

export default DynamicHowItWorks