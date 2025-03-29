"use client"

import dynamic from "next/dynamic"
import { BreadcrumbSchema } from "@/components/SchemaOrg"

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

